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
import Link from "next/link";
import Offset from "@/components/Generic/Offset";
import Metadata from "@/components/Generic/Metadata";
import {motion} from "motion/react";
import Footer from "@/components/Generic/Footer";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {countVisit, getVisits} from "@/backend/visitsCounter";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    await countVisit({route: '/project/fedimeow'});
    const visits = await getVisits({route: '/project/fedimeow'});

    return {
        props: {
            visits
        }
    }
}

export default function FediMeow(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Main>
            <Metadata title={'FediMeow'} description={'FediMeow is a bot that meows every hour on fedi.'}/>
            <Header highlight={'projects'}/>
            <Content>
                <Offset amt={4}/>
                <Heading level={1}>FediMeow</Heading>
                <p>
                    This is a bot that meows every hour on fedi.
                </p>
                <p>
                    This bot is really simple. It sends a message containing meow or nya, randomly adding a tidlie or a
                    :3 to the message.
                </p>
                <Link href="https://social.mldchan.dev/@FediMeow" className={'text-pink-400 hover:text-pink-200'}>
                    <motion.span whileTap={{scale: 0.9}} whileHover={{scale: 1.1}}>Official account</motion.span>
                </Link>
                <br/>
                <Link href="https://git.mldchan.dev/mld/fedimeow" className={'text-pink-400 hover:text-pink-200'}>
                    <motion.span whileTap={{scale: 0.9}} whileHover={{scale: 1.1}}>Source code</motion.span>
                </Link>
                <Offset amt={3}/>
                <Footer visits={props.visits}/>
            </Content>
        </Main>
    )
}
