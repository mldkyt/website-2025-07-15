/*
 *     Lunya's Personal Website
 *     Copyright (C) 2024  Lunya UwU :3
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
import Metadata from "@/components/Generic/Metadata";
import Footer from "@/components/Generic/Footer";
import {InferGetServerSidePropsType} from "next";
import {getVisits} from "@/backend/visitsCounter";
import Button from "@/components/Generic/Button";

export async function getServerSideProps() {
    const visits = await getVisits({route: '/project/fedi/streaks'});

    return {
        props: {
            visits
        }
    }
}

export default function FediStreaks(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Main>
            <Metadata title={'Fedi Streaks'}
                      description={'Fedi Streaks is a bot that checks your profile every day for new notes. If it doesn\'t find you posting for one day, you lose the streak. Every day you post, you get +1 streaks of sending notes.'}/>
            <Header highlight={'projects'}/>
            <Content>
                <Heading level={1}>Fedi Streaks</Heading>
                <p>
                    Fedi Streaks checks your profile every day for new notes. If it doesn&apos;t find you posting for one
                    day, you lose the streak. Every day you post, you get +1 streaks of sending notes.
                </p>
                <p className="pt-2">
                    This bot mainly derives from Chat Streaks in Akabot, which is pretty much this but for Discord. The
                    bot follows back within 30 seconds which allows you to check that it actually works. (If Lunya&apos;s
                    Sharkey instance is up, there&apos;s a high chance this is up as well).
                </p>

                <Offset amt={2}/>
                
                <div className="flex flex-col gap-2">
                    <Link href="https://social.mldchan.dev/@FediStreaks">
                        <Button fullWidth>Official account</Button>
                    </Link>
                    <Link href="https://git.lunya.pet/Lunya/fedi-streaks">
                        <Button fullWidth>Source code</Button>
                    </Link>
                </div>

                <br />

                <Footer visits={props.visits} route={'/project/fedi/streaks'}
                        />
            </Content>
        </Main>
    )
}
