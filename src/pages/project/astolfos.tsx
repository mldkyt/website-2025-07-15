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
    return <Main>
        <Metadata title={'AstolfOS'} description={'AstolfOS is a script that changes your Linux into AstolfOS!'}/>
        <Header highlight={'projects'}/>
        <Content>
            <Offset amt={4}/>
            <Heading level={1}>AstolfOS</Heading>

            <div className="bg-yellow-950 p-2 rounded-xl">
                <span className="font-bold mr-2">WARNING</span>
                I&apos;ve delisted this project due to the lack of support from me. As the project hasn&apos;t been 
                yet updated past Plasma 5 and Ubuntu 20.04 LTS, I am considering it unsupported. PR&apos;s on GitHub are welcome.
            </div>

            <p>AstolfOS transfers your Linux into AstolfOS!</p>
            <p>This script changes the OS name, KDE splash screen, GRUB configuration, neofetch configuration, and
                terminal style.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2">
                <Image src={desktop} alt="Desktop view of AstolfOS"/>
                <Image src={settings} alt="Settings view of AstolfOS"/>
                <Image src={neofetch} alt="Neofetch view of AstolfOS"/>
            </div>

            <div>
                <Link href={'https://github.com/uwugrl/AstolfOS/wiki/Manual-Installation'}>
                    <Button>Installation Guide</Button>
                </Link>
            </div>
            
            <br />
            <Link href={'/discord'}>
                <Button>Get support in the Discord server!</Button>
            </Link>

            <Offset amt={3}/>
            <Footer visits={props.visits} route={'/project/astolfos'} />
        </Content>
    </Main>
}
