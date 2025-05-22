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
import React, { useState } from "react";

import Main from "@/components/Generic/Main";
import {Header} from "@/components/Generic/Header";
import Content from "@/components/Generic/Content";
import Heading from "@/components/Generic/Heading";
import Offset from "@/components/Generic/Offset";

import desktop from '@/images/astolfos/desktop.png';
import settings from '@/images/astolfos/settings.png';
import neofetch from '@/images/astolfos/neofetch.png';
import Image from "next/image";
import Link from "next/link";
import Metadata from "@/components/Generic/Metadata";
import Footer from "@/components/Generic/Footer";
import {InferGetServerSidePropsType} from "next";
import {getVisits} from "@/backend/visitsCounter";
import Button from "@/components/Generic/Button";

export async function getServerSideProps() {
    const visits = await getVisits({route: '/project/astolfos'});

    return {
        props: {
            visits
        }
    }
}

export default function AstolfOS(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [tab, setTab] = useState("description");
    return <Main>
        <Metadata title={'AstolfOS'} description={'AstolfOS is a script that changes your Linux into AstolfOS!'}/>
        <Header highlight={'projects'}/>
        <Content>
            <Heading level={1}>AstolfOS</Heading>

            <div className="bg-yellow-950 p-2 rounded-xl">
                <span className="font-bold mr-2">WARNING</span>
                I&apos;ve delisted this project due to the lack of support from me. As the project hasn&apos;t been 
                yet updated past Plasma 5 and Ubuntu 20.04 LTS, I am considering it unsupported. PR&apos;s on GitHub are welcome.
            </div>

            
            <div className="w-full flex flex-row text-center">
                <div onClick={() => setTab('description')} className={`${tab === 'description' ? 'border-b-2 border-b-[#ff77ff]' : ''} py-2 w-full cursor-pointer`}>Description</div>
                <div onClick={() => setTab('images')} className={`${tab === 'images' ? 'border-b-2 border-b-[#ff77ff]' : ''} py-2 w-full cursor-pointer`}>Images</div>
            </div>

            {tab === 'description' && <>
                <p>AstolfOS transforms your Linux into AstolfOS!</p>
                <p className="font-bold">Changes</p>

                <ul className="list-disc ml-4">
                    <li>Changes OS name in all programs</li>
                    <li>Changes logo in KDE Plasma</li>
                    <li>Changes ASCII art inside the neofetch program for a different one</li>
                    <li>Changes neofetch colors</li>
                </ul>
            </>}

            {tab === 'images' && <>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <Image src={desktop} alt="Desktop view of AstolfOS"/>
                    <Image src={settings} alt="Settings view of AstolfOS"/>
                    <Image src={neofetch} alt="Neofetch view of AstolfOS"/>
                </div>
            </>}

            <Offset amt={2} />

            <div className="flex flex-col gap-2">
                <Link href={'https://github.com/uwugrl/AstolfOS/wiki/Manual-Installation'}>
                    <Button fullWidth>Installation Guide (GitHub)</Button>
                </Link>
            </div>

            <Offset amt={3}/>
            <Footer visits={props.visits} route={'/project/astolfos'} />
        </Content>
    </Main>
}
