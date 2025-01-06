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

import Main from "@/components/Generic/Main";
import {Header} from "@/components/Generic/Header";
import Content from "@/components/Generic/Content";
import Offset from "@/components/Generic/Offset";
import Heading from "@/components/Generic/Heading";
import Link from "next/link";

import image from '@/images/uwurandomrs.png';
import Image from "next/image";
import Metadata from "@/components/Generic/Metadata";
import {motion} from "motion/react";
import Footer from "@/components/Generic/Footer";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {countVisit, getVisits} from "@/backend/visitsCounter";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    await countVisit({route: '/project/uwurandom-rs'});
    const visits = await getVisits({route: '/project/uwurandom-rs'});

    return {
        props: {
            visits
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
            <p>
                This project, or library to say it right, does the same thing as <a href="/project/catgirlnonsense">Catgirl
                nonsense</a> does, but it does it as a library in the Rust programming language. Written by a transgirl
                btw.
            </p>
            <p>The library is very easy to use, for the maximum femefficiency :3</p>
            <Image src={image} alt={'UwUrandom-rs example source code'} className={'p-1 rounded-lg'}/>
            <Link href={'https://crates.io/crates/mldkyt-uwurandom-rs'} className={'text-pink-400 hover:text-pink-200'}>
                <motion.span whileTap={{scale: 0.9}} whileHover={{scale: 1.1}}>Download from crates.io</motion.span>
            </Link>
            <br/>
            <Link href={'https://github.com/mldchan/uwurandom-rs'} className={'text-pink-400 hover:text-pink-200'}>
                <motion.span whileTap={{scale: 0.9}} whileHover={{scale: 1.1}}>Download from GitHub</motion.span>
            </Link>
            <Offset amt={6}/>
            <Footer visits={props.visits}/>
        </Content>
    </Main>
}