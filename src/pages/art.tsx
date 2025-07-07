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

import React from 'react';
import Image from 'next/image';
import { InferGetServerSidePropsType } from 'next';

import Main from '@/components/Generic/main';
import Content from '@/components/Generic/content';
import { Header } from '@/components/Generic/header';
import Heading from '@/components/Generic/heading';
import Offset from '@/components/Generic/offset';
import busline from '@/images/art/busline.png';
import iine from '@/images/art/iine.png';
import mldchanSocial from '@/images/art/mldchansocial.png';
import ohayoo from '@/images/art/ohayoo.png';
import oyasumi from '@/images/art/oyasumi.png';
import website from '@/images/art/website.png';
import Metadata from '@/components/Generic/metadata';
import Footer from '@/components/Generic/footer';
import { getVisits } from '@/backend/visits-counter';

export async function getServerSideProps() {
    const visits = await getVisits({ route: '/art' });

    return {
        props: {
            visits,
        },
    };
}

export default function Art(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Main>
            <Metadata title={'Art'} description={"Lunya's art"} />
            <Header />
            <Content>
                <Offset amt={4} />
                <Heading level={1}>art</Heading>
                <p>lunya sometimes draws, here you can see her beautiful artwork! :3</p>
                <p className="text-sm text-gray-400">sometimes as cute as her &gt;//////&lt;</p>

                <Heading level={2}>BusLine</Heading>
                <p>A kawaii logo of the local bus transport company.</p>
                <Image src={busline} alt={'BusLine kawaii logo'} />

                <Heading level={2}>IINE</Heading>
                <p>A Japanese way to react to a post with a &quot;Like&quot; or &quot;Thumbs Up&quot;</p>
                <Image src={iine} alt={'IINE'} />

                <Heading level={2}>Lunya social</Heading>
                <p>Kawaii logo for my Sharkey instance</p>
                <Image src={mldchanSocial} alt={'Lunya social logo'} />

                <Heading level={2}>Ohayoo</Heading>
                <p>Japanese for &quot;Good Morning&quot;</p>
                <Image src={ohayoo} alt={'Ohayoo'} />

                <Heading level={2}>Oyasumi</Heading>
                <p>Japanese for &quot;Good Night&quot;</p>
                <Image src={oyasumi} alt={'Oyasumi'} />

                <Heading level={2}>Website</Heading>
                <p>The logo of this website</p>
                <Image src={website} alt={'Website logo'} />
                <Offset amt={6} />
                <Footer visits={props.visits} route={'/art'} />
            </Content>
        </Main>
    );
}
