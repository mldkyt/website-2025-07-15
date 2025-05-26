/*
 *     Lunya's Personal Website
 *     Copyright (C) 2024  Lunya UwU :3
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
                <Heading level={1}>Invite Akabot into your server</Heading>
                <p className="py-2">Before you continue inviting Akabot into your server, the public version of Akabot has a terms of
                    service and privacy policy, and I am required to make you read these:</p>
                <ul className={'list-disc ml-4'}>
                    <li>
                        <Link href={'/project/akabot/tos'} className={'text-pink-400 hover:text-pink-200 transition-all'}>
                            <span>Terms of Service</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/project/akabot/privacy'} className={'text-pink-400 hover:text-pink-200 transition-all'}>
                            <span>Privacy Policy</span>
                        </Link>
                    </li>
                </ul>

                <p className="py-2">By clicking invite, I accept the Privacy Policy and Terms of Service above.</p>
                <Link href={'https://discord.com/oauth2/authorize?client_id=1172922944033411243'}>
                    <Button fullWidth>Invite Akabot</Button>
                </Link>
                <Offset amt={3}/>
                <Footer visits={props.visits} route={'/project/akabot/invite'} />
            </Content>
        </Main>
    )
}
