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
import Metadata from "@/components/Generic/Metadata";
import Footer from "@/components/Generic/Footer";
import {InferGetServerSidePropsType} from "next";
import {getVisits} from "@/backend/visitsCounter";
import Disclaimer from "@/components/Generic/Disclaimer";

export async function getServerSideProps() {
    const visits = await getVisits({route: '/project/msctweaks'});

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
            <Metadata title={'MSC Tweaks'} description={'This mod adds a few tweaks to My Summer Car.'}/>
            <Header highlight={'projects'}/>
            <Content>
                <Offset amt={4}/>
                <Heading level={1}>MSC Tweaks</Heading>
                <Disclaimer title="Deprecated Project"
                            message="Deprecated on 2024/07/01. No updates are provided under any circumstance."/>

                <p>
                    This mod adds a few tweaks to My Summer Car, some of the most notable of
                    her are:
                </p>
                <ul className={'list-disc ml-4'}>
                    <li>Disable Pena (the green car)</li>
                    <li>Disable Kyläjäni (the yellow car)</li>
                    <li>Disable Amis2 (the Skoda)</li>
                    <li>Saving of Satsuma&apos;s temperature</li>
                    <li>Player can&apos;t die from Urine (realism)</li>
                    <li>Enable console in all scenarios</li>
                    <li>Add fall damage into the game</li>
                    <li>Better Window Handles (Speed up Window rolling up and down)</li>
                    <li>Disable Rally</li>
                    <li>Better FPS meter</li>
                    <li>Garage Customizer (move the table and flag to different places)</li>
                    <li>Gifu Gauge Fixes (repair Gifu battery and oil gauge)</li>
                    <li>Money Changes Display (displays changes of money)</li>
                    <li>Water Bills</li>
                </ul>
                <p>This mod page was last updated on 2024/07/14.</p>

                <Offset amt={3}/>
                <Footer visits={props.visits} route={'/project/msctweaks'}
                        cloudflareSiteToken={props.cloudflareSiteToken}/>
            </Content>
        </Main>
    )
}
