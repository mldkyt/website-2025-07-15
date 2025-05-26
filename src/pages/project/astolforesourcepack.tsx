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
import React, { useState } from "react";

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
            visits
        }
    }
}

export default function AstolfoResourcePack(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [tab, setTab] = useState("features");

    return (
        <Main>
            <Header highlight={'projects'}/>
            <Content>
                <Heading level={1}>Astolfo Resource Pack</Heading>

                <Heading level={2}>Minecraft :3 edition let&apos;s gooo</Heading>
                <p>This resource pack changes the Minecraft loading screen, logo, totem of undying and ending screen to be more Astolfo themed.</p>

                <div className="w-full flex flex-row text-center">
                    <div onClick={() => setTab('features')} className={`${tab === 'features' ? 'border-b-2 border-b-[#ff77ff]' : ''} py-2 w-full cursor-pointer`}>Features</div>
                    <div onClick={() => setTab('images')} className={`${tab === 'images' ? 'border-b-2 border-b-[#ff77ff]' : ''} py-2 w-full cursor-pointer`}>Images</div>
                </div>

                {tab === 'features' && <>
                    <p className="font-bold">Full list of changes:</p>
                    <ul className="list-disc ml-4">
                        <li>Change a bunch of the text</li>
                        <li>Change main menu panorama images</li>
                        <li>Change loading screen image (requires jar mod)</li>
                        <li>Change end subtitles text</li>
                        <li>Cherry logs are femboy logs</li>
                        <li>Change menu music to Astolfo rap</li>
                        <li>Change menu logo and edition</li>
                        <li>Change default server and resourcepack icon</li>
                        <li>Change splash texts</li>
                    </ul>
                </>}

                {tab === 'images' && <>
                    <Image src={loading} alt={'Minecraft 1.13+ loading screen, the icon is replaced with Astolfo'} className={'p-1 rounded-lg'}/>
                    <Image src={menu} alt={'Minecraft main menu, but it says Astolfocraft: Femboy edition on the top and the panorama is replaced with Astolfo.'} className={'p-1 rounded-lg'}/>
                    <Image src={ending} alt={'Minecraft ending screen, except all the subtitles are replaced with :3'} className={'p-1 rounded-lg'}/>
                </>}

                <Offset amt={2} />

                <div className="flex flex-col gap-2">
                    <Link href="https://git.lunya.pet/Lunya/AstolfoResourcePackInstaller/releases">
                        <Button fullWidth>Download builder</Button>
                    </Link>
                    <Link href="https://git.lunya.pet/Lunya/AstolfoResourcePackInstaller">
                        <Button fullWidth>Source code</Button>
                    </Link>
                    <Link href={'/discord'}>
                        <Button fullWidth>Get support in the Discord server!</Button>
                    </Link>
                </div>

                <Offset amt={3}/>
                <Footer visits={props.visits} route={'/project/astolforesourcepack'} />
            </Content>
        </Main>
    )
}
