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
import Image from "next/image";

import banner from '@/images/velkysmpmon.png';
import Metadata from "@/components/Generic/Metadata";
import {motion} from "motion/react";
import Footer from "@/components/Generic/Footer";

export default function Template() {
    return (
        <Main>
            <Metadata title={'VelkySMP monitor'}
                      description={'VelkySMP monitor is a project that monitors the VelkySMP server and displays the data in a website and in Minecraft.'}/>
            <Header highlight={'projects'}/>
            <Content>
                <Offset amt={3}/>
                <Heading level={1}>VelkySMP monitor</Heading>

                <p>This project is split up to multiple projects, namely one that monitors the server, one that displays
                    the data and one that displays the data in Minecraft.</p>

                <Image src={banner} alt={'Banner'} className={'p-1 rounded-xl'}/>

                <Heading level={2}>The indexer (mcstatusvelky)</Heading>

                <p>The indexer is a Python script that fetches the server information and writes player join and leave
                    changes into a database. This allows it to run whenever it wants to and it doesn't matter if there's
                    downtime.</p>

                <p>
                    It calculates player playtimes from join and leave times of the players and puts it in human
                    readable format into the online database. The online database, unlike the local one, only stores the
                    most important information, namely the name of the player, human readable player time and profile
                    customization added by the website.
                </p>

                <Heading level={2}>The website (velkysmpmon)</Heading>

                <p>
                    The website has many features, the most basic is listing the players with their playtimes and
                    ordering based on playtime, grouping them based on weeks, days, alphabetical letters and online
                    state. The additional features are profile customizations, allowing customizing display color,
                    display name, pride flags, country flag, displaying of certain information.
                </p>

                <p>The customization page also has additional things, such as viewing 10 past game sessions, viewing
                    last logins into the customization panel and suggesting new features into the VelkySMP website.</p>

                <Link href="https://github.com/mldchan/mcstatusvelky"
                      className={'text-pink-400 hover:text-pink-200'}>
                    <motion.span whileTap={{scale: 0.9}} whileHover={{scale: 1.1}}>View the GitHub repository of the
                        indexer
                    </motion.span>
                </Link>
                <br/>
                <Link href="https://github.com/mldchan/velkysmp"
                      className={'text-pink-400 hover:text-pink-200'}>
                    <motion.span whileTap={{scale: 0.9}} whileHover={{scale: 1.1}}>View the GitHub repository of the
                        website
                    </motion.span>
                </Link>

                <Offset amt={3}/>
                <Footer/>
            </Content>
        </Main>
    )
}
