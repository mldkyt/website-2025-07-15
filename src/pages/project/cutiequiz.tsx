/*
 *     Lunya's Personal Website
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
                <Heading level={1}>Cutie Quiz</Heading>
                <Disclaimer title="Deprecated Project" message="Deprecated on 2024/10/31."/>

                <div className="w-full flex flex-row text-center">
                    <div onClick={() => setTab('description')} className={`${tab === 'description' ? 'border-b-2 border-b-[#ff77ff]' : ''} py-2 w-full cursor-pointer`}>Description</div>
                    <div onClick={() => setTab('images')} className={`${tab === 'images' ? 'border-b-2 border-b-[#ff77ff]' : ''} py-2 w-full cursor-pointer`}>Images</div>
                </div>

                {tab === 'description' && <>
                    <p className="py-2">
                        Cutie Quiz was a tiny app which takes a username and then determines how cute you are by analyzing
                        brain waves.
                    </p>
                    <p className="py-2">
                        It does this using revolutionary next-generation technology, which is newer and better than AI and
                        determines values without errors. It has such good accuracy that you don&apos;t need any other source of
                        information to verify your results because our results are always accurate.
                    </p>
                    <p className="py-2">
                        <i>
                            This application is a joke if you didn&apos;t figure it out yet.
                        </i>
                    </p>
                </>}

                {tab === 'images' && <>
                    <Image src={one} alt={'Cutie Quiz 1'} className={'p-1 rounded-lg'}/>
                    <Image src={two} alt={'Cutie Quiz 2'} className={'p-1 rounded-lg'}/>
                    <Image src={three} alt={'Cutie Quiz 3'} className={'p-1 rounded-lg'}/>
                </>}

                <Offset amt={2} />

                <Link href="https://github.com/uwugrl/CutieQuiz">
                    <Button fullWidth>Source code</Button>
                </Link>

                <Offset amt={3}/>
                <Footer visits={props.visits} route={'/project/cutiequiz'}
                        />
            </Content>
        </Main>
    )
}
