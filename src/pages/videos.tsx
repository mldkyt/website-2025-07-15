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
import {InferGetServerSidePropsType} from "next";
import Main from "@/components/Generic/Main";
import {Header} from "@/components/Generic/Header";
import Content from "@/components/Generic/Content";
import Heading from "@/components/Generic/Heading";
import Link from "next/link";
import {motion} from "motion/react";
import Offset from "@/components/Generic/Offset";
import Footer from "@/components/Generic/Footer";
import Metadata from "@/components/Generic/Metadata";
import {getVisits} from "@/backend/visitsCounter";
import { PrismaClient } from "@prisma/client";

export async function getServerSideProps() {

    const prisma = new PrismaClient();
    await prisma.$connect();

    const videos = await prisma.youTubeVideos.findMany({
        orderBy: {
            PublishedAt: 'desc'
        }
    });

    await prisma.$disconnect();

    const visits = await getVisits({route: '/videos'});

    return {
        props: {
            videos: videos.map(x => {
                return {
                    url: `https://www.youtube.com/watch?v=${x.VideoID}`,
                    title: x.Title,
                    description: x.Description,
                    thumbnail: x.ThumbURL
                }
            }),
            visits,
            cloudflareSiteToken: process.env['CLOUDFLARE_SITE_TOKEN']!
        }
    }
}


function Video(props: { url: string, title: string, description: string, thumbnail: string }) {
    return <motion.div whileHover={{scale: 1.05}} whileTap={{scale: .95}}
                       className={'bg-[#222] m-2 p-2 rounded-lg drop-shadow-md'}>
        <Link href={props.url}>
            <img src={props.thumbnail} alt={`${props.title} ${props.description}`}
                 className={'rounded-lg drop-shadow-md'}/>
            <h2 className={'font-bold'}>{props.title}</h2>
            <p className={'text-gray-500 text-sm'}>{props.description}</p>
        </Link>
    </motion.div>
}

export default function Videos(props: InferGetServerSidePropsType<typeof getServerSideProps>) {


    return <Main>
        <Metadata title={'mldchan\'s videos'} description={'Full list of mldchan\'s videos!'}/>
        <Header highlight={'videos'}/>
        <Content>
            <Offset amt={4}/>
            <Heading level={1}>mldchan&apos;s Videos</Heading>
            <p>All of mldchan&apos;s videos on YouTube.</p>

            <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'}>
                {props.videos.map((x, i) => {
                    return <Video {...x} key={i}/>
                })}
            </div>

            <Offset amt={3}/>
        </Content>
        <Footer visits={props.visits} route={'/videos'} cloudflareSiteToken={props.cloudflareSiteToken}/>
    </Main>
}
