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
import Metadata from "@/components/Generic/Metadata";
import Footer from "@/components/Generic/Footer";
import {InferGetServerSidePropsType} from "next";
import {getVisits} from "@/backend/visitsCounter";
import Link from "next/link";

const ToSHeading = (props: { children: string }) => {
    return (
        <h2 className={'text-xl font-bold my-4'}>{props.children}</h2>
    )
}

export async function getServerSideProps() {
    const visits = await getVisits({route: '/project/akabot/tos'});

    return {
        props: {
            visits
        }
    }
}

export default function TermsOfService(props: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
        <Main>
            <Metadata title={'Akabot Terms of Service'} description={'Akabot Discord bot terms of service'}/>
            <Header highlight={'projects'}/>
            <Content>
                <Heading level={1}>akabot terms of service uwu</Heading>
                <p className="py-2">last update: 2025/05/26</p>

                <p className="py-2">by using the bot you agree to my work uwu 🥺:</p>
                <ToSHeading>usage restrictions</ToSHeading>
                <p className="py-2">
                    akabot may only be used in places where it is appropriate to, no extremist organizations, no hate speech organizations and nothing violation discord&apos;s terms of service.
                </p>
                <ToSHeading>no data collection</ToSHeading>
                <p className="py-2">akabot doesn&apos;t store data. as a single developer i do not need the data for anything anyway.</p>
                <ToSHeading>modifications to this document</ToSHeading>
                <p className="py-2">
                    the modifications of this document will be announced on the <Link href="https://discord.gg/YFksXpXnn6" className={'text-pink-400 hover:text-pink-200 transition-all'}>support discord server</Link>.
                </p>
                <ToSHeading>access restrictions</ToSHeading>
                <p className="py-2">if you&apos;re found in violation of these terms, we may restrict access to the bot to you, or your server.</p>
                <ToSHeading>limitation of liability</ToSHeading>
                <p className="py-2">the bot is not responsible for any damages done to your server. this is further reinforced by <Link href="https://git.lunya.pet/Lunya/Akabot/src/branch/1.0/LICENSE.md">the license</Link>.</p>
                <ToSHeading>contact</ToSHeading>
                <p className="py-2">you can contact me at <a
                    href="mailto:mldkyt@proton.me">mldkyt@proton.me</a>.</p>
                <p className="py-2">please agree to my fancy work 🥺 or pwease don&pos;t use the official instance of the bot.</p>
                <Offset amt={3}/>
                <Footer visits={props.visits} route={'/project/akabot/tos'}
                        />
            </Content>
        </Main>
    )
}