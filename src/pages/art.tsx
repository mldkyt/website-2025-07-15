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


import Main from "@/components/Generic/Main";
import Content from "@/components/Generic/Content";
import {Header} from "@/components/Generic/Header";
import Heading from "@/components/Generic/Heading";
import Offset from "@/components/Generic/Offset";

import busline from '@/images/art/busline@2x.png';
import iine from '@/images/art/iine3@2x.png';
import mldchanSocial from '@/images/art/mldchan social 2@2x.png';
import ohayoo from '@/images/art/ohayoo@2x.png';
import oyasumi from '@/images/art/oyasumi@2x.png';
import website from '@/images/art/website@4x.png';
import Image from "next/image";
import Metadata from "@/components/Generic/Metadata";
import Footer from "@/components/Generic/Footer";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {countVisit, getVisits} from "@/backend/visitsCounter";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    await countVisit({route: '/art'});
    const visits = await getVisits({route: '/art'});

    return {
        props: {
            visits
        }
    }
}

export default function Art(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <Main>
        <Metadata title={'Art'} description={'mldchan\'s art'}/>
        <Header/>
        <Content>
            <Offset amt={3}/>
            <Heading level={1}>Art</Heading>
            <p>mldchan sometimes does art. Here are some of her works :3</p>

            <Heading level={2}>BusLine</Heading>
            <p>A kawaii logo of the local bus transport company.</p>
            <Image src={busline} alt={'BusLine kawaii logo'}/>

            <Heading level={2}>IINE</Heading>
            <p>A Japanese way to react to a post with a "Like" or "Thumbs Up"</p>
            <Image src={iine} alt={'IINE'}/>

            <Heading level={2}>mldchan social</Heading>
            <p>Kawaii logo for my Sharkey instance</p>
            <Image src={mldchanSocial} alt={'mldchan social logo'}/>

            <Heading level={2}>Ohayoo</Heading>
            <p>Japanese for "Good Morning"</p>
            <Image src={ohayoo} alt={'Ohayoo'}/>

            <Heading level={2}>Oyasumi</Heading>
            <p>Japanese for "Good Night"</p>
            <Image src={oyasumi} alt={'Oyasumi'}/>

            <Heading level={2}>Website</Heading>
            <p>The logo of this website</p>
            <Image src={website} alt={'Website logo'}/>
            <Offset amt={6}/>
            <Footer visits={props.visits}/>
        </Content>
    </Main>
}