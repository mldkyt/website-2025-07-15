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
import Heading from "@/components/Generic/Heading";
import Offset from "@/components/Generic/Offset";
import Link from "next/link";

import config from '@/images/birthday/config.png';
import add from '@/images/birthday/add.png';
import Image from "next/image";
import Metadata from "@/components/Generic/Metadata";

import Footer from "@/components/Generic/Footer";
import {InferGetServerSidePropsType} from "next";
import {getVisits} from "@/backend/visitsCounter";
import Button from "@/components/Generic/Button";

export async function getServerSideProps() {
    const visits = await getVisits({route: '/project/birthday'});

    return {
        props: {
            visits
        }
    }
}

export default function Birthday(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [tab, setTab] = useState("description");
    return <Main>
        <Metadata title={'Birthday'} description={'Birthday App'}/>
        <Header highlight={'projects'}/>
        <Content>
            <Heading level={1}>Birthday App</Heading>
            
            <div className="w-full flex flex-row text-center">
                <div onClick={() => setTab('description')} className={`${tab === 'description' ? 'border-b-2 border-b-[#ff77ff]' : ''} py-2 w-full cursor-pointer`}>Description</div>
                <div onClick={() => setTab('images')} className={`${tab === 'images' ? 'border-b-2 border-b-[#ff77ff]' : ''} py-2 w-full cursor-pointer`}>Images</div>
            </div>


            {tab === 'description' && <>
            
                <p>The birthday app shows a popup forcing you to wish happy birthday to somebody on their birthday.</p>

                <p className="pt-2">Running the app with <code>/config</code> as a parameter will show a configuration
                    window.</p>

                <p className="pt-2">To add a new birthday, click on Actions &gt; Add new birthday.</p>
                <p className="pt-2"><strong>Don&apos;t forget to save your birthdays before exiting the application!
                    File &gt; Save
                    changes</strong>
                </p>
                <p className="pt-2">Please note that because of this app being old, there is a link pointing to mldkyt.com,
                    which doesn&apos;t
                    work.</p>
            </>}

            {tab === 'images' && <>
                <Image src={config} alt="Configuration Window" className={'p-1 rounded-lg pt-2'}/>
                <Image src={add} alt="Add new birthday Window" className={'p-1 rounded-lg pt-2'}/>
            </>}

            <Offset amt={2} />

            <div className="flex flex-col gap-2">
                <Link href="https://github.com/uwugrl/Birthday/releases">
                    <Button fullWidth>Download latest release</Button>
                </Link>
                <Link href="https://github.com/uwugrl/Birthday">
                    <Button fullWidth>View source code</Button>
                </Link>
            </div>

            <Offset amt={3}/>
            <Footer visits={props.visits} route={'/project/birthday'} />
        </Content>
    </Main>
}