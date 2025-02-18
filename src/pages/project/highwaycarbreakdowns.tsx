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

import one from '@/images/highwaycarbreakdowns/1.webp';
import two from '@/images/highwaycarbreakdowns/2.webp';
import three from '@/images/highwaycarbreakdowns/3.webp';
import four from '@/images/highwaycarbreakdowns/4.webp';
import five from '@/images/highwaycarbreakdowns/5.webp';
import Image from "next/image";
import Link from "next/link";
import Metadata from "@/components/Generic/Metadata";
import {motion} from "motion/react";
import Footer from "@/components/Generic/Footer";
import {InferGetServerSidePropsType} from "next";
import {getVisits} from "@/backend/visitsCounter";
import Disclaimer from "@/components/Generic/Disclaimer";

export async function getServerSideProps() {
    const visits = await getVisits({route: '/project/highwaycarbreakdowns'});

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
            <Metadata title={'Highway Car Breakdowns'}
                      description={'Highway Car Breakdowns is a mod for My Summer Car that adds randomly breaking down cars on the highway.'}/>
            <Header highlight={'projects'}/>
            <Content>
                <Offset amt={4}/>
                <Disclaimer title="Deprecated Project"
                            message="Deprecated on 2024/07/01. No updates are provided under any circumstance."/>
                <Heading level={1}>Highway Car Breakdowns</Heading>
                <p>
                    This mod adds randomly breaking down cars on the highway. The car spawn
                    rate is very rare though.
                </p>
                <p>How to fix a car if you spot one on the highway:</p>
                <ol className={'ml-6 list-decimal'}>
                    <li>Locate a car broken down next to the road (very rare)</li>
                    <li>The guy next to it will say hello</li>
                    <li>Inspect the car damage by pointing at the car and holding F</li>
                    <li>The problem will be inspected and found out</li>
                    <li>You can head to get the resources or fix it on spot</li>
                    <li>You will get a random payment afterward</li>
                </ol>

                <Heading level={2}>Images</Heading>
                <Image src={one} alt={'Highway Car Breakdowns'} className={'p-1 rounded-lg'}/>
                <Image src={two} alt={'Highway Car Breakdowns'} className={'p-1 rounded-lg'}/>
                <Image src={three} alt={'Highway Car Breakdowns'} className={'p-1 rounded-lg'}/>
                <Image src={four} alt={'Highway Car Breakdowns'} className={'p-1 rounded-lg'}/>
                <Image src={five} alt={'Highway Car Breakdowns'} className={'p-1 rounded-lg'}/>


                <Link href="https://code.mldchan.dev/MSCMods/HighwayCarBreakdowns">
                    <motion.span whileTap={{scale: 0.9}} whileHover={{scale: 1.1}}>Forgejo</motion.span>
                </Link>

                <Offset amt={3}/>
                <Footer visits={props.visits} route={'/project/highwaycarbreakdowns'}
                        cloudflareSiteToken={props.cloudflareSiteToken}/>
            </Content>
        </Main>
    )
}
