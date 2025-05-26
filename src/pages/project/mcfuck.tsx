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
import {Header} from "@/components/Generic/Header";
import Content from "@/components/Generic/Content";
import Heading from "@/components/Generic/Heading";
import Offset from "@/components/Generic/Offset";
import Link from "next/link";
import Metadata from "@/components/Generic/Metadata";
import Footer from "@/components/Generic/Footer";
import {InferGetServerSidePropsType} from "next";
import {getVisits} from "@/backend/visitsCounter";
import Image from "next/image";

import mcfuck from '@/images/mcfuck.png';
import Button from "@/components/Generic/Button";

export async function getServerSideProps() {
    const visits = await getVisits({route: '/project/mcfuck'});

    return {
        props: {
            visits
        }
    }
}

export default function MCFuck(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <Main>
        <Metadata title={'MCFuck'}
                  description={'MCFuck is a program that attempts to mess with your Minecraft settings, without corrupting them.'}/>
        <Header highlight={'projects'}/>
        <Content>
            <Heading level={1}>mcfuck</Heading>

            <p>mcfuck is a program that fucks with the options.txt save file :3</p>
            <p className="pt-2">you are able to witness these changes right after loading into the game after applying these changes :3</p>
            <p className="pt-2">the ui is like this for silly reasons :333 <strong
                className={'text-red-600'}>make sure to make an options.txt backup! :333</strong></p>
            <Image src={mcfuck} alt="MC options.txt fucker main window"/>

            <br/>

            <Link href={'https://github.com/LunyaPet/MCFuck/releases'}>
                <Button fullWidth>download abomination</Button>
            </Link>
            <Offset amt={3}/>
            <Footer visits={props.visits} route={'/project/mcfuck'} />
        </Content>
    </Main>
}
