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
import Footer from "@/components/Generic/Footer";
import { InferGetServerSidePropsType} from "next";
import {getVisits} from "@/backend/visitsCounter";
import Image from "next/image";

import menu from '@/images/astolforp/menu.png';
import loading from '@/images/astolforp/loading.png';
import ending from '@/images/astolforp/ending.png';
import Button from "@/components/Generic/Button";

export async function getServerSideProps() {
    const visits = await getVisits({route: '_TEMPLATE'});

    return {
        props: {
            visits,
            cloudflareSiteToken: process.env['CLOUDFLARE_SITE_TOKEN']!
        }
    }
}

export default function AstolfoResourcePack(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Main>
            <Header highlight={'projects'}/>
            <Content>
                <Offset amt={4}/>
                <Heading level={1}>Astolfo Resource Pack</Heading>

                <Heading level={2}>Minecraft edition let&apos;s gooo</Heading>
                <p>This resource pack changes the Minecraft loading screen, logo, totem of undying and ending screen to be more Astolfo themed.</p>

                <Image src={loading} alt={'Minecraft 1.13+ loading screen, the icon is replaced with Astolfo'} className={'p-1 rounded-lg'}/>
                <Image src={menu} alt={'Minecraft main menu, but it says Astolfocraft: Femboy edition on the top and the panorama is replaced with Astolfo.'} className={'p-1 rounded-lg'}/>
                <Image src={ending} alt={'Minecraft ending screen, except all the subtitles are replaced with'} className={'p-1 rounded-lg'}/>

                <Link href="https://code.mldchan.dev/mld/AstolfoResourcePackInstaller/releases">
                    <Button>Download builder</Button>
                </Link>
                <br/>
                <Link href="https://code.mldchan.dev/mld/AstolfoResourcePackInstaller">
                    <Button>Source code</Button>
                </Link>

                <Offset amt={3}/>
                <Footer visits={props.visits} route={'/project/astolforesourcepack'} cloudflareSiteToken={props.cloudflareSiteToken}/>
            </Content>
        </Main>
    )
}
