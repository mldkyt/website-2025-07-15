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
            visits,
            cloudflareSiteToken: process.env['CLOUDFLARE_SITE_TOKEN']!
        }
    }
}

export default function FediSummarizer(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Main>
            <Metadata title={'Fedi Summarizer'}
                      description={'A fedi bot that summarizes the amount of notes you post every midnight.'}/>
            <Header highlight={'projects'}/>
            <Content>
                <Offset amt={4}/>
                <Heading level={1}>Fedi Summarizer</Heading>
                <p>
                    This bot summarizes the amount of notes you post every midnight. It does so in your private
                    messages.
                </p>
                <p>The message sent to you every midnight contains the following information currently:</p>
                <ul className={'list-disc ml-4'}>
                    <li>Notes count</li>
                    <li>Quote notes</li>
                    <li>Reply notes</li>
                    <li>Renotes</li>
                    <li>Total reactions on your posts</li>
                    <li>Most popular used emoji on your posts</li>
                </ul>

                <Image src={message} alt={'Example message sent by the bot'}/>

                <br/>

                <Link href="https://social.mldchan.dev/@FediSummarizer">
                    <Button>Official account</Button>
                </Link>
                <Link href="https://code.mldchan.dev/mld/fedi-summarizer">
                    <Button>Source code</Button>
                </Link>

                <Offset amt={3}/>
                <Footer visits={props.visits} route={'/project/fedi/summarizer'}
                        cloudflareSiteToken={props.cloudflareSiteToken}/>
            </Content>
        </Main>
    )
}
