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
import Button from "@/components/Generic/Button";
import Metadata from "@/components/Generic/Metadata";
import Footer from "@/components/Generic/Footer";
import {InferGetServerSidePropsType} from "next";
import {getVisits} from "@/backend/visitsCounter";
import {ReactNode} from "react";
import Disclaimer from "@/components/Generic/Disclaimer";

export async function getServerSideProps() {
    const visits = await getVisits({route: '/project/girlsocial'});

    return {
        props: {
            visits,
            cloudflareSiteToken: process.env['CLOUDFLARE_SITE_TOKEN']!
        }
    }
}

function FeatureList(props: { children: ReactNode }) {
    return <div className={'grid grid-cols-2'}>
        {props.children}
    </div>
}

function Feature(props: { title: string, body: string }) {
    return <div className={'m-1 bg-[#222] drop-shadow-lg rounded-lg p-2 py-1'}>
        <h3 className={'text-xl font-bold'}>{props.title}</h3>
        <p>{props.body}</p>
    </div>
}

export default function GirlSocial(props: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
        <Main>
            <Metadata title={'GirlSocial'}
                      description={'GirlSocial: An open-source chatting platform focused on inclusivity.'}/>
            <Header highlight={'projects'}/>
            <Content>
                <Offset amt={5}/>

                <Disclaimer title="Work in Progress"
                            message="This project is nowhere near complete and is in active development. It may take upwards of months to complete."/>

                <Offset amt={3}/>


                <div>
                    <h1 className={'text-center text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold'}>GirlSocial: An
                        open-source chatting platform focused on inclusivity.</h1>
                    <br/>
                    {/* <div className={'w-max m-auto'}>
                        <Button disabled>Not yet available</Button>
                    </div> */}
                </div>

                <Offset amt={2}/>
                <p className={'text-center'}>GirlSocial is an upcoming social network with a focus on inclusivity.</p>

                <Heading level={2}>Features</Heading>

                <FeatureList>
                    <Feature title={'Free Forever'} body={'The service is open-source and free forever!'}/>
                    <Feature title={'Inclusivity'}
                             body={'The service will have fields for pronouns, gender identity and sexual orientation fields.'}/>
                    <Feature title={'Easy Plurality'}
                             body={'If the server will allow plurality, it will be as easy as switching it directly from the chat box. No bots required.'}/>
                    <Feature title={'More!'}
                             body={'Any suggestions are welcome! We\'ll make any controversial features off by default.'}/>
                </FeatureList>

                <Offset amt={2}/>

                <Heading level={2}>How do I self-host this service?</Heading>


                <p>The service is fully open-source! You can self host your very own instance by building the Docker
                    image in here:</p>
                <Link href={'https://git.mldchan.dev/girlsocial/server'} className={'m-1'}>
                    <Button>View the source code on mldchan&apos;s self-hosted GitLab</Button>
                </Link>

                <Heading level={2}>Donations are welcome!</Heading>

                <p>The service is not free to run, as any of my other services, so donations are welcome! It will also
                    support my effort in this project.</p>

                <Link href={'/donate'}>
                    <Button>Donate to mldchan</Button>
                </Link>

                <Offset amt={4}/>

                <Footer visits={props.visits} route={'/project/girlsocial'}
                        cloudflareSiteToken={props.cloudflareSiteToken}/>
            </Content>
        </Main>
    )

}
