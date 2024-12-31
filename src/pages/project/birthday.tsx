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
import Heading from "@/components/Generic/Heading";
import Offset from "@/components/Generic/Offset";
import Link from "next/link";

import config from '@/images/birthday/config.png';
import add from '@/images/birthday/add.png';
import Image from "next/image";
import Metadata from "@/components/Generic/Metadata";

import {motion} from "motion/react";
import Footer from "@/components/Generic/Footer";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {countVisit, getVisits} from "@/backend/visitsCounter";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    await countVisit({route: '/project/birthday'});
    const visits = await getVisits({route: '/project/birthday'});

    return {
        props: {
            visits
        }
    }
}

export default function Birthday(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <Main>
        <Metadata title={'Birthday'} description={'Birthday App'}/>
        <Header highlight={'projects'}/>
        <Content>
            <Offset amt={3}/>
            <Heading level={1}>Birthday App</Heading>

            <p>Running the app with <code>/config</code> as a parameter will show a configuration window.</p>

            <p>To add a new birthday, click on Actions &gt; Add new birthday.</p>
            <p><strong>Don't forget to save your birthdays before exiting the application! File &gt; Save
                changes</strong>
            </p>
            <p>Please note that because of this app being old, there is a link pointing to mldkyt.com, which doesn't
                work.</p>

            <Image src={config} alt="Configuration Window" className={'p-1 rounded-lg'}/>
            <Image src={add} alt="Add new birthday Window" className={'p-1 rounded-lg'}/>

            <Link href="https://github.com/mldchan/Birthday/releases">
                <motion.span whileTap={{scale: 0.9}} whileHover={{scale: 1.1}}>Download latest release</motion.span>
            </Link>
            <Offset amt={3}/>
            <Footer visits={props.visits}/>
        </Content>
    </Main>
}