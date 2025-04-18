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

import safe1 from '@/images/astolfoiscomingforyou/safe_1.png';
import safe2 from '@/images/astolfoiscomingforyou/safe_2.png';
import evil1 from '@/images/astolfoiscomingforyou/evil_1.png';
import evil2 from '@/images/astolfoiscomingforyou/evil_2.png';
import Image from "next/image";
import Offset from "@/components/Generic/Offset";
import Link from "next/link";
import Metadata from "@/components/Generic/Metadata";
import Footer from "@/components/Generic/Footer";
import {InferGetServerSidePropsType} from "next";
import {getVisits} from "@/backend/visitsCounter";
import Button from "@/components/Generic/Button";

export async function getServerSideProps() {
    const visits = await getVisits({route: '/project/astolfoiscomingforyou'});

    return {
        props: {
            visits
        }
    }
}

export default function Astolfoiscomingforyou(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Main>
            <Metadata title={'Astolfo is Coming for You'}
                      description={'Astolfo is coming for you has 2 variants: Safe and Evil. The main difference between the safe variant and evil variant is that the safe gives you compliments, while the evil shuts down your machine.'}/>
            <Header highlight={'projects'}/>
            <Content>
                <Offset amt={4}/>
                <Heading level={1}>Astolfo is Coming for You</Heading>

                <p>Astolfo is coming for you has 2 variants: Safe and Evil.</p>
                <p>The main difference between the safe variant and evil variant is that the safe gives you compliments,
                    while the evil shuts down your machine.</p>

                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div>
                        <Heading level={2}>Safe Variant</Heading>

                        <p>The safe variant gives you compliments once it finishes.</p>
                        <iframe width="343" height='200'
                                src="https://www.youtube-nocookie.com/embed/HkuCNFGXMNU?si=lDmf3C1Cf65gE5bL"
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        <Image className={'p-1 rounded-lg'} src={safe1}
                               alt={'Window of Astolfo coming for you, with a countdown of kilometers'}/>
                        <Image className={'p-1 rounded-lg'} src={safe2} alt={'Astolfo gives you lots of compliments'}/>

                        <br/>
                        <Link href={'https://github.com/uwugrl/AstolfoIsComingForYou/releases'}>
                            <Button>Download the latest release</Button>
                        </Link>
                    </div>

                    <div>
                        <Heading level={2}>Evil Variant</Heading>

                        <p>The evil variant shuts down your computer once it finishes.</p>
                        <iframe width="343" height="200"
                                src="https://www.youtube-nocookie.com/embed/ZtN1QqLx3ww?si=VaVwXDUo505gF9TS"
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        <Image className={'p-1 rounded-lg'} src={evil1}
                               alt={'Window of angry Astolfo coming for you, with a countdown of kilometers'}/>
                        <Image className={'p-1 rounded-lg'} src={evil2}
                               alt={'Astolfo shuts down your machine in anger'}/>
                        <br/>

                        <Link href={'https://github.com/uwugrl/AstolfoIsComingForYou/releases'}>
                            <Button>
                                Download the latest release
                            </Button>
                        </Link>
                    </div>
                </div>
                <br />
                <Link href={'/discord'}>
                    <Button>Get support in the Discord server!</Button>
                </Link> 
                <Offset amt={2}/>
                <Footer visits={props.visits} route={'/project/astolfoiscomingforyou'}
                        />
            </Content>
        </Main>
    )
}
