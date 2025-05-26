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
                <Heading level={1}>Astolfo resource pack</Heading>

                <Heading level={2}>minecraft :3 edition :3</Heading>
                <p>changes a lot of things to be more Astolfo themed :3</p>

                <div className="w-full flex flex-row text-center">
                    <div onClick={() => setTab('features')} className={`${tab === 'features' ? 'border-b-2 border-b-[#ff77ff]' : ''} py-2 w-full cursor-pointer`}>features</div>
                    <div onClick={() => setTab('images')} className={`${tab === 'images' ? 'border-b-2 border-b-[#ff77ff]' : ''} py-2 w-full cursor-pointer`}>images</div>
                </div>

                {tab === 'features' && <>
                    <p className="font-bold">full list :3:</p>
                    <ul className="list-disc ml-4">
                        <li>change lots of the text :3</li>
                        <li>change the main menu panoramas, titles and music :3</li>
                        <li>change loading screen (requires jar mod)</li>
                        <li>change ending credits :3</li>
                        <li>rename cherry logs to femboy logs :3</li>
                        <li>change default server and resourcepack icon :3</li>
                        <li>change splash texts :3</li>
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
                        <Button fullWidth>download buidler :3</Button>
                    </Link>
                    <Link href="https://git.lunya.pet/Lunya/AstolfoResourcePackInstaller">
                        <Button fullWidth>source :3</Button>
                    </Link>
                    <Link href={'/discord'}>
                        <Button fullWidth>join my Discord server for support! :3</Button>
                    </Link>
                </div>

                <Offset amt={3}/>
                <Footer visits={props.visits} route={'/project/astolforesourcepack'} />
            </Content>
        </Main>
    )
}
