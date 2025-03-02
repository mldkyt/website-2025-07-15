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
import Link from "next/link";
import Offset from "@/components/Generic/Offset";
import Metadata from "@/components/Generic/Metadata";
import Footer from "@/components/Generic/Footer";
import {InferGetServerSidePropsType} from "next";
import {getVisits} from "@/backend/visitsCounter";
import Button from "@/components/Generic/Button";
import examplepost from '@/images/fedi/meow/examplepost.png';
import Image from "next/image";

export async function getServerSideProps() {
    const visits = await getVisits({route: '/project/fedimeow'});

    return {
        props: {
            visits,
            cloudflareSiteToken: process.env['CLOUDFLARE_SITE_TOKEN']!
        }
    }
}

export default function FediMeow(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Main>
            <Metadata title={'FediMeow'} description={'FediMeow is a bot that meows every hour on fedi.'}/>
            <Header highlight={'projects'}/>
            <Content>
                <Offset amt={4}/>
                <Heading level={1}>FediMeow</Heading>
                <p>
                    This is a bot that meows every hour on fedi.
                </p>
                <p className="pt-2">
                    This bot is really simple. It sends a message containing meow or nya, randomly adding a tidlie or a
                    to the message.
                </p>
                <Image src={examplepost} alt="A post from Fedi Meow (@FediMeow), containing the text mraow :3c"
                       className="py-2 rounded-lg drop-shadow-md"/>
                <Link href="https://social.mldchan.dev/@FediMeow">
                    <Button>Official account</Button>
                </Link>
                <Link href="https://code.mldchan.dev/mld/fedimeow">
                    <Button>Source code</Button>
                </Link>
                <Offset amt={3}/>
                <Footer visits={props.visits} route={'/project/fedimeow'}
                        cloudflareSiteToken={props.cloudflareSiteToken}/>
            </Content>
        </Main>
    )
}
