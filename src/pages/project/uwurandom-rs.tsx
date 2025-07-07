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

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { InferGetServerSidePropsType } from 'next';

import Main from '@/components/Generic/main';
import { Header } from '@/components/Generic/header';
import Content from '@/components/Generic/content';
import Offset from '@/components/Generic/offset';
import Heading from '@/components/Generic/heading';
import image from '@/images/uwurandomrs.png';
import Metadata from '@/components/Generic/metadata';
import Footer from '@/components/Generic/footer';
import { getVisits } from '@/backend/visits-counter';
import Button from '@/components/Generic/button';

export async function getServerSideProps() {
    const visits = await getVisits({ route: '/project/uwurandom-rs' });

    return {
        props: {
            visits,
        },
    };
}

export default function UwurandomRs(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Main>
            <Metadata title={'uwurandom-rs'} description={'an uwuifier written in the fastest language in the world, Rust.'} />
            <Header highlight={'projects'} />
            <Content>
                <Heading level={1}>uwurandom-rs</Heading>
                <p className="py-2">
                    an uwuifier written in the fastest language in the world, Rust. <i>wait why do I have thigh highs?</i>
                </p>
                <p className="py-2">
                    this project, or library to say it right, does the same thing as <a href="/project/catgirlnonsense">catgirl nonsense</a> does, but it does it as a library in the Rust programming language.
                </p>
                <p className="py-2">the library is very easy to use, for the maximum femefficiency :3</p>
                <Image src={image} alt={'UwUrandom-rs example source code'} className={'p-1 rounded-lg py-2'} />

                <Offset amt={2} />

                <div className="flex flex-col gap-2">
                    <Link href={'https://crates.io/crates/mldkyt-uwurandom-rs'}>
                        <Button fullWidth>crates.io</Button>
                    </Link>
                    <Link href={'https://github.com/LunyaPet/uwurandom-rs'}>
                        <Button fullWidth>download from github</Button>
                    </Link>
                    <Link href={'/discord'}>
                        <Button fullWidth>join my Discord server for support :3</Button>
                    </Link>
                </div>

                <Offset amt={6} />
                <Footer visits={props.visits} route={'/project/uwurandom-rs'} />
            </Content>
        </Main>
    );
}
