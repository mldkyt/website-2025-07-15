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
import Offset from "@/components/Generic/Offset";
import Heading from "@/components/Generic/Heading";
import Link from "next/link";
import Button from "@/components/Generic/Button";
import Metadata from "@/components/Generic/Metadata";
import Footer from "@/components/Generic/Footer";
import {InferGetServerSidePropsType} from "next";
import {getVisits} from "@/backend/visitsCounter";

export async function getServerSideProps() {
    const visits = await getVisits({route: '/project/akabot/invite'});

    return {
        props: {
            visits
        }
    }
}

export default function InviteAkabot(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Main>
            <Metadata title={'Invite Akabot'} description={'Invite the Akabot Discord bot into your server'}/>
            <Header highlight={'projects'}/>
            <Content>
                <Heading level={1}>invite akabot :3</Heading>
                <p className="py-2">before you continue, pwease read my hard work 🥺</p>
                <ul className={'list-disc ml-4'}>
                    <li>
                        <Link href={'/project/akabot/tos'} className={'text-pink-400 hover:text-pink-200 transition-all'}>
                            <span>terms of service for using the bot</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/project/akabot/privacy'} className={'text-pink-400 hover:text-pink-200 transition-all'}>
                            <span>privacy policy, what is stored and what not</span>
                        </Link>
                    </li>
                </ul>

                <p className="py-2">by clicking the link below, you agree to my hard work 🥺</p>
                <Link href={'https://discord.com/oauth2/authorize?client_id=1172922944033411243'}>
                    <Button fullWidth>add the bot uwu</Button>
                </Link>
                <Offset amt={3}/>
                <Footer visits={props.visits} route={'/project/akabot/invite'} />
            </Content>
        </Main>
    )
}
