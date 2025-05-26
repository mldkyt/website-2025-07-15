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
import {InferGetServerSidePropsType} from "next";
import {getVisits} from "@/backend/visitsCounter";
import Button from "@/components/Generic/Button";
import Metadata from "@/components/Generic/Metadata";
import Image from "next/image";

export async function getServerSideProps() {
    const visits = await getVisits({route: '/project/monbazou/modlist'});

    return {
        props: {
            visits
        }
    }
}

import menuitem from '@/images/monbazou/modlist/menuitem.webp';
import settings from '@/images/monbazou/modlist/settings.webp';

export default function MonBazouModList(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [tab, setTab] = useState("description");
    return (
        <Main>
            <Metadata title="Mon Bazou Mod List"
                      description="Mon Bazou Mod List adds a mod list in the main menu of the game."/>
            <Header highlight={'projects'}/>
            <Content>
                <Heading level={1}>Mon Bazou mod list</Heading>

                <div className="w-full flex flex-row text-center">
                    <div onClick={() => setTab('description')} className={`${tab === 'description' ? 'border-b-2 border-b-[#ff77ff]' : ''} py-2 w-full cursor-pointer`}>description</div>
                    <div onClick={() => setTab('images')} className={`${tab === 'images' ? 'border-b-2 border-b-[#ff77ff]' : ''} py-2 w-full cursor-pointer`}>images</div>
                </div>

                {tab === 'description' && <>
                    <p className="font-bold">features:</p>
                    <ul className="list-disc ml-4">
                        <li><strong>List of Mods</strong>: the mod shows you a list of mods you can enable, disable and configure.
                        </li>
                        <li><strong>Console</strong>: get information to what mod throws what errors :3</li>
                        <li><strong>Languages</strong>: we got multiple languages :3
                        </li>
                    </ul>
                </>}

                {tab === 'images' && <>
                    <Image src={menuitem} className={'rounded-lg p-1'} alt="A screenshot of the Mon Bazou main menu. There are options: Continue, new game, load game, and a newly added option Mod Menu. It continues with changelog. On the left is a black car with pink window cover." />
                    <Image src={settings} className={'rounded-lg p-1'} alt="A screenshot showing a bunch of options of a mod. There is one option selected, that being a text menu option, and the user is typing Japanese into it." />
                </>}

                <Offset amt={2} />

                <div className="flex flex-col gap-2">
                    <Link href="https://www.nexusmods.com/monbazou/mods/288">
                        <Button fullWidth>nexusmods link</Button>
                    </Link>
                    <Link href="https://git.lunya.pet/Lunya/monbazoumodlist">
                        <Button fullWidth>source link</Button>
                    </Link>
                </div>

                <Offset amt={3}/>
                <Footer visits={props.visits} route={'/project/monbazou/modlist'}
                        />
            </Content>
        </Main>
    )
}
