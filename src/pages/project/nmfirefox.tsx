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
            <Heading level={1}>Nexus enhancements for Firefox</Heading>

            <p>a small extension for Firefox originally made for personal use :3</p>
            <Image src={nmfirefox} alt="User Interface" className={'rounded-lg'}/>
            <p className="py-2">
                this simple exception really simply allows you to hide comments from specific users on nexusmods mods and images.
            </p>
            <p className="py-2">
                this extension was last tested in like August 2024, so the extensions may not work :3c
            </p>
            <br/>
            <Link href={'https://github.com/LunyaPet/NexusEnhancementsForFirefox/releases'}>
                <Button fullWidth>download the extension :3</Button>
            </Link>
            <Offset amt={3}/>
            <Footer visits={props.visits} route={'/project/nmfirefox'} />
        </Content>
    </Main>
}