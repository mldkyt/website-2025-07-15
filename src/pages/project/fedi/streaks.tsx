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

export default function FediStreaks() {
    return (
        <Main>
            <Metadata title={'Fedi Streaks'}
                      description={'Fedi Streaks is a bot that checks your profile every day for new notes. If it doesn\'t find you posting for one day, you lose the streak. Every day you post, you get +1 streaks of sending notes.'}/>
            <Header highlight={'projects'}/>
            <Content>
                <Offset amt={3}/>
                <Heading level={1}>Fedi Streaks</Heading>
                <p>
                    Fedi Streaks checks your profile every day for new notes. If it doesn't find you posting for one
                    day, you lose the streak. Every day you post, you get +1 streaks of sending notes.
                </p>
                <p>
                    This bot mainly derives from Chat Streaks in Akabot, which is pretty much this but for Discord. The
                    bot follows back within 30 seconds which allows you to check that it actually works. (If mldchan's
                    Sharkey instance is up, there's a high chance this is up as well).
                </p>
                <Link href="https://social.mldchan.dev/@FediStreaks" className={'text-pink-400 hover:text-pink-200'}>
                    <motion.span whileTap={{scale: 0.9}} whileHover={{scale: 1.1}}>Official account</motion.span>
                </Link>
                <br/>
                <Link href="https://git.mldchan.dev/mld/fedi-streaks" className={'text-pink-400 hover:text-pink-200'}>
                    <motion.span whileTap={{scale: 0.9}} whileHover={{scale: 1.1}}>Source code</motion.span>
                </Link>
                <Offset amt={3}/>
                <Footer/>
            </Content>
        </Main>
    )
}
