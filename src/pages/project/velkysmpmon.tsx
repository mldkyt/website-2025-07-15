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
import Offset from "@/components/Generic/Offset";
import Heading from "@/components/Generic/Heading";
import Link from "next/link";
import Image from "next/image";

import banner from '@/images/velkysmpmon.png';
import Metadata from "@/components/Generic/Metadata";
import Footer from "@/components/Generic/Footer";
import {InferGetServerSidePropsType} from "next";
import {getVisits} from "@/backend/visitsCounter";
import Disclaimer from "@/components/Generic/Disclaimer";
import Button from "@/components/Generic/Button";

export async function getServerSideProps() {
    const visits = await getVisits({route: '/project/velkysmpmon'});

    return {
        props: {
            visits,
            cloudflareSiteToken: process.env['CLOUDFLARE_SITE_TOKEN']!
        }
    }
}

export default function Template(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Main>
            <Metadata title={'VelkySMP monitor'}
                      description={'VelkySMP monitor is a project that monitors the VelkySMP server and displays the data in a website and in Minecraft.'}/>
            <Header highlight={'projects'}/>
            <Content>
                <Offset amt={4}/>
                <Heading level={1}>VelkySMP monitor</Heading>
                <Disclaimer title="Deprecated Project"
                            message="Deprecated on 2024/08/01. No updates are provided under any circumstance."/>

                <p className="my-2">This project is split up to multiple projects, namely one that monitors the server,
                    one that displays
                    the data and one that displays the data in Minecraft.</p>

                <Image src={banner} alt={'Banner'} className={'p-1 rounded-xl'}/>

                <Heading level={2}>The indexer (mcstatusvelky)</Heading>

                <p className="mt-2">The indexer is a Python script that fetches the server information and writes player
                    join and leave
                    changes into a database. This allows it to run whenever it wants to and it doesn&apos;t matter if there&apos;s
                    downtime.</p>

                <p className="my-2">
                    It calculates player playtimes from join and leave times of the players and puts it in human
                    readable format into the online database. The online database, unlike the local one, only stores the
                    most important information, namely the name of the player, human readable player time and profile
                    customization added by the website.
                </p>

                <Heading level={2}>The website (velkysmpmon)</Heading>

                <p>
                    The website has many features, the most basic is listing the players with their playtimes and
                    ordering based on playtime, grouping them based on weeks, days, alphabetical letters and online
                    state. The additional features are profile customizations, allowing customizing display color,
                    display name, pride flags, country flag, displaying of certain information.
                </p>

                <p className="my-2">The customization page also has additional things, such as viewing 10 past game
                    sessions, viewing
                    last logins into the customization panel and suggesting new features into the VelkySMP website.</p>

                <Link href="https://github.com/uwugrl/mcstatusvelky">
                    <Button>View the GitHub repository of the indexer</Button>
                </Link>
                <br/>
                <Link href="https://github.com/uwugrl/velkysmp">
                    <Button>View the GitHub repository of the website</Button>
                </Link>

                <Offset amt={3}/>
                <Footer visits={props.visits} route={'/project/velkysmpmon'}
                        cloudflareSiteToken={props.cloudflareSiteToken}/>
            </Content>
        </Main>
    )
}
