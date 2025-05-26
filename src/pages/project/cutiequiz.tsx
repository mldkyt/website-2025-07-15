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
import Offset from "@/components/Generic/Offset";
import Heading from "@/components/Generic/Heading";
import Link from "next/link";
import Image from "next/image";

import one from '@/images/cutiequiz/1.png';
import two from '@/images/cutiequiz/2.png';
import three from '@/images/cutiequiz/3.png';
import Metadata from "@/components/Generic/Metadata";
import Footer from "@/components/Generic/Footer";
import {InferGetServerSidePropsType} from "next";
import {getVisits} from "@/backend/visitsCounter";
import Disclaimer from "@/components/Generic/Disclaimer";
import Button from "@/components/Generic/Button";

export async function getServerSideProps() {
    const visits = await getVisits({route: '/project/cutiequiz'});

    return {
        props: {
            visits
        }
    }
}

export default function Template(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [tab, setTab] = useState("description");
    return (
        <Main>
            <Metadata title={'Cutie Quiz'}
                      description={'[DEPRECATED] Cutie Quiz was a tiny app which takes a username and then determines how cute you are by analyzing brain waves.'}/>
            <Header highlight={'projects'}/>
            <Content>
                <Heading level={1}>cutie quiz :3</Heading>
                <Disclaimer title="depwecated uwu" message="i deprecated this project on 2024/10/31."/>

                <div className="w-full flex flex-row text-center">
                    <div onClick={() => setTab('description')} className={`${tab === 'description' ? 'border-b-2 border-b-[#ff77ff]' : ''} py-2 w-full cursor-pointer`}>Description</div>
                    <div onClick={() => setTab('images')} className={`${tab === 'images' ? 'border-b-2 border-b-[#ff77ff]' : ''} py-2 w-full cursor-pointer`}>Images</div>
                </div>

                {tab === 'description' && <>
                    <p className="py-2">
                        cutie quiz was a tiny app made for me to try out supabase. it would take in a username and then calculate user cuteness :3
                    </p>
                    <p className="py-2">
                        it did this using revolutionary next gen technology, which was literally telling them they are cute :3
                    </p>
                </>}

                {tab === 'images' && <>
                    <Image src={one} alt={'Cutie Quiz 1'} className={'p-1 rounded-lg'}/>
                    <Image src={two} alt={'Cutie Quiz 2'} className={'p-1 rounded-lg'}/>
                    <Image src={three} alt={'Cutie Quiz 3'} className={'p-1 rounded-lg'}/>
                </>}

                <Offset amt={2} />

                <Link href="https://github.com/LunyaPet/CutieQuiz">
                    <Button fullWidth>source</Button>
                </Link>

                <Offset amt={3}/>
                <Footer visits={props.visits} route={'/project/cutiequiz'}
                        />
            </Content>
        </Main>
    )
}
