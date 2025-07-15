/*
 *     mldchan's Personal Website
 *     Copyright (C) 2024  エムエルディー
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
import React from 'react';
import Link from 'next/link';
import { InferGetServerSidePropsType } from 'next';
import Image from 'next/image';

import Main from '@/components/Generic/main';
import { Header } from '@/components/Generic/header';
import Content from '@/components/Generic/content';
import Offset from '@/components/Generic/offset';
import Heading from '@/components/Generic/heading';
import Metadata from '@/components/Generic/metadata';
import Footer from '@/components/Generic/footer';
import { getVisits } from '@/backend/visits-counter';
import Button from '@/components/Generic/button';
import pridemod from '@/images/msc/pridemod.png';

export async function getServerSideProps() {
    const visits = await getVisits({ route: '/project/pridemod' });

    return {
        props: {
            visits,
        },
    };
}

export default function Template(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Main>
            <Metadata title={'Pride Mod'} description={'A mod that adds pride into My Summer Car'} />
            <Header highlight={'projects'} />
            <Content>
                <Heading level={1}>Pride Mod</Heading>

                <Image src={pridemod} alt="Pride mod for My Summer Car" />

                <br />

                <p>Pride Mod for My Summer Car! Current features:</p>
                <ul className="list-disc ml-4">
                    <li>
                        <strong>UI color changer</strong>: LGBTQ+, Transgender, Non Binary, Pansexual and custom!
                    </li>
                    <li>
                        <strong>Pride Flags:</strong> LGBTQ+ Pride Flags including Lesbian, Gay, Bisexual, Transgender and custom!
                    </li>
                    <li>
                        <strong>OwOifier:</strong> OwOifies all text in all mods and all places.
                    </li>
                    <li>
                        <strong>Identity Changer:</strong> Allows you to become an enby, girl, trans masc, trans fem in My Summer Car!
                    </li>
                </ul>

                <Link href="https://www.nexusmods.com/mysummercar/mods/8943">
                    <Button>Download on NexusMods</Button>
                </Link>

                <Offset amt={3} />
                <Footer visits={props.visits} route={'/project/pridemod'} />
            </Content>
        </Main>
    );
}
