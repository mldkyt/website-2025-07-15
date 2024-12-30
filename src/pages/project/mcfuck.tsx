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
import Metadata from "@/components/Generic/Metadata";
import {motion} from "motion/react";

export default function MCFuck() {
    return <Main>
        <Metadata title={'MCFuck'}
                  description={'MCFuck is a program that attempts to mess with your Minecraft settings, without corrupting them.'}/>
        <Header highlight={'projects'}/>
        <Content>
            <Offset amt={3}/>
            <Heading level={1}>MCFuck</Heading>

            <p>MCFuck is a program that attempts to fuck with your Minecraft settings, as the name implies, without
                corrupting them.</p>
            <p>When this program finishes messing up your settings file, you'll be able to witness those changes, if
                your
                game starts up, in game.</p>
            <p>Since this was written purely for fun, the UI looks like so. <strong className={'text-red-600'}>Although
                before
                you
                run it and let your options file get corrupted, I highly recommend making a backup!</strong></p>

            <br/>

            <Link href={'https://github.com/mldchan/MCFuck/releases'} className={'text-pink-400 hover:text-pink-200'}>
                <motion.span whileTap={{scale: 0.9}} whileHover={{scale: 1.1}}>Download this abomination</motion.span>
            </Link>
            <Offset amt={3}/>
        </Content>
    </Main>
}
