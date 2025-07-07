/*
 *     Lunya's Personal Website
 *     Copyright (C) 2024-2025  Lunya UwU :3
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import React, { useState } from 'react';
import Link from 'next/link';
import { InferGetServerSidePropsType } from 'next';
import Image from 'next/image';

import Main from '@/components/Generic/main';
import { Header } from '@/components/Generic/header';
import Content from '@/components/Generic/content';
import Heading from '@/components/Generic/heading';
import Offset from '@/components/Generic/offset';
import Metadata from '@/components/Generic/metadata';
import Footer from '@/components/Generic/footer';
import { getVisits } from '@/backend/visits-counter';
import Button from '@/components/Generic/button';
import examplepost from '@/images/fedi/meow/examplepost.png';

export async function getServerSideProps() {
    const visits = await getVisits({ route: '/project/fedimeow' });

    return {
        props: {
            visits,
        },
    };
}

export default function FediMeow(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [tab, setTab] = useState('description');

    return (
        <Main>
            <Metadata title={'FediMeow'} description={'FediMeow is a bot that meows every hour on fedi.'} />
            <Header highlight={'projects'} />
            <Content>
                <Heading level={1}>fedi meow</Heading>

                <div className="w-full flex flex-row text-center">
                    <div onClick={() => setTab('description')} className={`${tab === 'description' ? 'border-b-2 border-b-[#ff77ff]' : ''} py-2 w-full cursor-pointer`}>
                        Description
                    </div>
                    <div onClick={() => setTab('images')} className={`${tab === 'images' ? 'border-b-2 border-b-[#ff77ff]' : ''} py-2 w-full cursor-pointer`}>
                        Images
                    </div>
                </div>

                {tab === 'description' && (
                    <>
                        <p>this is a silly fedi bot :333</p>
                        <p className="pt-2">all this bot does btw is that it notes a variation of &quot;meow&quot; on the account it is connected to :33</p>
                    </>
                )}

                {tab === 'images' && (
                    <>
                        <Image src={examplepost} alt="A post from Fedi Meow (@FediMeow), containing the text mraow :3c" className="py-2 rounded-lg drop-shadow-md" />
                    </>
                )}

                <Offset amt={2} />

                <div className="flex flex-col gap-2">
                    <Link href="https://social.mldchan.dev/@FediMeow">
                        <Button fullWidth>official account</Button>
                    </Link>
                    <Link href="https://git.lunya.pet/Lunya/fedimeow">
                        <Button fullWidth>source</Button>
                    </Link>
                </div>

                <br />

                <Footer visits={props.visits} route={'/project/fedimeow'} />
            </Content>
        </Main>
    );
}
