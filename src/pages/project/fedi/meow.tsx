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
import React, { useState } from "react";

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
            visits
        }
    }
}

export default function FediMeow(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [tab, setTab] = useState("description");

    return (
        <Main>
            <Metadata title={'FediMeow'} description={'FediMeow is a bot that meows every hour on fedi.'}/>
            <Header highlight={'projects'}/>
            <Content>
                <Heading level={1}>FediMeow</Heading>

                <div className="w-full flex flex-row text-center">
                    <div onClick={() => setTab('description')} className={`${tab === 'description' ? 'border-b-2 border-b-[#ff77ff]' : ''} py-2 w-full cursor-pointer`}>Description</div>
                    <div onClick={() => setTab('images')} className={`${tab === 'images' ? 'border-b-2 border-b-[#ff77ff]' : ''} py-2 w-full cursor-pointer`}>Images</div>
                </div>
                
                {tab === 'description' && <>
                    <p>
                        This is a bot that meows every hour on fedi.
                    </p>
                    <p className="pt-2">
                        This bot is really simple. It sends a message containing meow or nya, randomly adding a tidlie or a
                        :3 to the message.
                    </p>
                </>}
                
                {tab === 'images' && <>
                    <Image src={examplepost} alt="A post from Fedi Meow (@FediMeow), containing the text mraow :3c"
                        className="py-2 rounded-lg drop-shadow-md"/>
                </>}
                
                <Offset amt={2} />
                    
                <div className="flex flex-col gap-2">
                    <Link href="https://social.mldchan.dev/@FediMeow">
                        <Button fullWidth>Official account</Button>
                    </Link>
                    <Link href="https://code.mldchan.dev/mld/fedimeow">
                        <Button fullWidth>Source code</Button>
                    </Link>
                </div>
                
                <br />

                <Footer visits={props.visits} route={'/project/fedimeow'}
                        />
            </Content>
        </Main>
    )
}
