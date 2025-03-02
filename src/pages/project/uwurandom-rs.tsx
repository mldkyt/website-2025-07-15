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

import React from "react";

import Main from "@/components/Generic/Main";
import {Header} from "@/components/Generic/Header";
import Content from "@/components/Generic/Content";
import Offset from "@/components/Generic/Offset";
import Heading from "@/components/Generic/Heading";
import Link from "next/link";

import image from '@/images/uwurandomrs.png';
import Image from "next/image";
import Metadata from "@/components/Generic/Metadata";
import Footer from "@/components/Generic/Footer";
import {InferGetServerSidePropsType} from "next";
import {getVisits} from "@/backend/visitsCounter";
import Button from "@/components/Generic/Button";

export async function getServerSideProps() {
    const visits = await getVisits({route: '/project/uwurandom-rs'});

    return {
        props: {
            visits,
            cloudflareSiteToken: process.env['CLOUDFLARE_SITE_TOKEN']!
        }
    }
}

export default function UwurandomRs(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <Main>
        <Metadata title={'uwurandom-rs'}
                  description={'Catgirl nonsense, but in the Rust programming language, for maximum femininity.'}/>
        <Header highlight={'projects'}/>
        <Content>
            <Offset amt={4}/>
            <Heading level={1}>uwurandom-rs</Heading>
            <p>Catgirl nonsense, but in the Rust programming language, for maximum femininity.</p>
            <p className="pt-2">
                This project, or library to say it right, does the same thing as <a href="/project/catgirlnonsense">Catgirl
                nonsense</a> does, but it does it as a library in the Rust programming language. Written by a transgirl
                btw.
            </p>
            <p className="pt-2">The library is very easy to use, for the maximum femefficiency</p>
            <Image src={image} alt={'UwUrandom-rs example source code'} className={'p-1 rounded-lg py-2'}/>
            <Link href={'https://crates.io/crates/mldkyt-uwurandom-rs'}>
                <Button>Download from crates.io</Button>
            </Link>
            <br/>
            <Link href={'https://github.com/uwugrl/uwurandom-rs'}>
                <Button>Download from GitHub</Button>
            </Link>
            <Offset amt={6}/>
            <Footer visits={props.visits} route={'/project/uwurandom-rs'}
                    cloudflareSiteToken={props.cloudflareSiteToken}/>
        </Content>
    </Main>
}