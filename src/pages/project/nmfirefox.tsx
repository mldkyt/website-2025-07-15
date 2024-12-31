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
import Heading from "@/components/Generic/Heading";
import Content from "@/components/Generic/Content";
import {Header} from "@/components/Generic/Header";
import Offset from "@/components/Generic/Offset";

import nmfirefox from '@/images/nexusmodsfirefox.png';
import Image from "next/image";
import Link from "next/link";
import Metadata from "@/components/Generic/Metadata";
import {motion} from "motion/react";
import Footer from "@/components/Generic/Footer";

export default function NMFirefox() {
    return <Main>
        <Metadata title={'NexusMods Enhancements for Firefox'}
                  description={'NexusMods Enhancements for Firefox is an extension that adds a few features to Nexus Mods, namely blocking people.'}/>
        <Header highlight={'projects'}/>
        <Content>
            <Offset amt={3}/>
            <Heading level={1}>Nexus Enhancements for Firefox</Heading>

            <p>This is an extension for Firefox which adds a few features to Nexus Mods, namely blocking people.</p>
            <p>
                The extension was made initially for personal use only, hence it not being available on Firefox
                Extension
                Store, only being on GitHub. By using this extension, you are viable for all damages, even if this
                shouldn't
                cause
                any, unless NexusMods updates.
            </p>
            <Image src={nmfirefox} alt="User Interface" className={'rounded-lg'}/>
            <p>
                The UI allows adding blocked people by username. Blocking a person will hide their comments and replies.
                Unblocking a person requires reload to re-show any hidden comments.
            </p>
            <p>
                To download and install this extension, follow the link to the download and download
                the <code>xpi</code> file while using Firefox. The extension should install.
            </p>
            <br/>
            <Link href={'https://github.com/mldchan/NexusEnhancementsForFirefox/releases'}
                  className={'text-pink-400 hover:text-pink-200'}>
                <motion.span whileTap={{scale: 0.9}} whileHover={{scale: 1.1}}>Download Nexus Enhancements for Firefox
                </motion.span>
            </Link>
            <Offset amt={3}/>
            <Footer/>
        </Content>
    </Main>
}