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

import React from "react";

import Main from "@/components/Generic/Main";
import Heading from "@/components/Generic/Heading";
import Content from "@/components/Generic/Content";
import {Header} from "@/components/Generic/Header";
import Offset from "@/components/Generic/Offset";

import nmfirefox from '@/images/nexusmodsfirefox.png';
import Image from "next/image";
import Link from "next/link";
import Metadata from "@/components/Generic/Metadata";
import Footer from "@/components/Generic/Footer";
import {InferGetServerSidePropsType} from "next";
import {getVisits} from "@/backend/visitsCounter";
import Button from "@/components/Generic/Button";

export async function getServerSideProps() {
    const visits = await getVisits({route: '/project/nmfirefox'});

    return {
        props: {
            visits
        }
    }
}

export default function NMFirefox(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <Main>
        <Metadata title={'NexusMods Enhancements for Firefox'}
                  description={'NexusMods Enhancements for Firefox is an extension that adds a few features to Nexus Mods, namely blocking people.'}/>
        <Header highlight={'projects'}/>
        <Content>
            <Heading level={1}>Nexus Enhancements for Firefox</Heading>

            <p>This is an extension for Firefox which adds a few features to Nexus Mods, namely blocking people.</p>
            <p className="py-2">
                The extension was made initially for personal use only, hence it not being available on Firefox
                Extension
                Store, only being on GitHub. By using this extension, you are viable for all damages, even if this
                shouldn&apos;t
                cause
                any, unless NexusMods updates.
            </p>
            <Image src={nmfirefox} alt="User Interface" className={'rounded-lg'}/>
            <p className="py-2">
                The UI allows adding blocked people by username. Blocking a person will hide their comments and replies.
                Unblocking a person requires reload to re-show any hidden comments.
            </p>
            <p className="py-2">
                To download and install this extension, follow the link to the download and download
                the <code>xpi</code> file while using Firefox. The extension should install.
            </p>
            <br/>
            <Link href={'https://github.com/LunyaPet/NexusEnhancementsForFirefox/releases'}>
                <Button fullWidth>Download Nexus Enhancements for Firefox</Button>
            </Link>
            <Offset amt={3}/>
            <Footer visits={props.visits} route={'/project/nmfirefox'} />
        </Content>
    </Main>
}