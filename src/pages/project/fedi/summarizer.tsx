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
import React, { useState } from "react";

import Main from "@/components/Generic/Main";
import {Header} from "@/components/Generic/Header";
import Content from "@/components/Generic/Content";
import Heading from "@/components/Generic/Heading";
import Link from "next/link";
import Offset from "@/components/Generic/Offset";

import message from '@/images/fedi/summarizer/message.png';
import Image from "next/image";
import Metadata from "@/components/Generic/Metadata";
import Footer from "@/components/Generic/Footer";
import {InferGetServerSidePropsType} from "next";
import {getVisits} from "@/backend/visitsCounter";
import Button from "@/components/Generic/Button";

export async function getServerSideProps() {
    const visits = await getVisits({route: '/project/fedi/summarizer'});

    return {
        props: {
            visits
        }
    }
}

export default function FediSummarizer(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [tab, setTab] = useState("description");

    return (
        <Main>
            <Metadata title={'Fedi Summarizer'}
                      description={'A fedi bot that summarizes the amount of notes you post every midnight.'}/>
            <Header highlight={'projects'}/>
            <Content>
                <Heading level={1}>fedi summarizer</Heading>
                <div className="w-full flex flex-row text-center">
                    <div onClick={() => setTab('description')} className={`${tab === 'description' ? 'border-b-2 border-b-[#ff77ff]' : ''} py-2 w-full cursor-pointer`}>description</div>
                    <div onClick={() => setTab('images')} className={`${tab === 'images' ? 'border-b-2 border-b-[#ff77ff]' : ''} py-2 w-full cursor-pointer`}>images</div>
                </div>

                {tab === 'description' && <>
                    <p>
                        this is a fedi bot that gives you a summary of your activity on the fediverse for the day :3
                    </p>
                    <p>
                        it includes everything, from notes, renotes, quote notes to what reactions have reached your posts :3
                    </p>
                </>}

                {tab === 'images' && <Image src={message} className={'p-1 rounded-lg py-2'} alt={'Example message sent by the bot'}/>}

                <Offset amt={2} /> 

                <div className="flex flex-col gap-2">
                    <Link href="https://social.mldchan.dev/@FediSummarizer">
                        <Button fullWidth>official account</Button>
                    </Link>
                    <Link href="https://git.lunya.pet/Lunya/fedi-summarizer">
                        <Button fullWidth>source</Button>
                    </Link>
                </div>

                <Offset amt={3}/>
                <Footer visits={props.visits} route={'/project/fedi/summarizer'}
                        />
            </Content>
        </Main>
    )
}
