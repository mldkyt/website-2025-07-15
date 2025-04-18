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
import { Header } from "@/components/Generic/Header";
import Page1 from "@/components/MainPage/Page1";
import Page3Projects from "@/components/MainPage/Page3Projects";
import Page5Other from "@/components/MainPage/Page5Other";
import Metadata from "@/components/Generic/Metadata";
import Footer from "@/components/Generic/Footer";
import Page2About from "@/components/MainPage/Page2About";
import { InferGetServerSidePropsType } from "next";
import { getVisits } from "@/backend/visitsCounter";
import Page4MisskeyEmbed from "@/components/MainPage/Page4MisskeyEmbed";
import Heading from "@/components/Generic/Heading";
import Offset from "@/components/Generic/Offset";
import Button from "@/components/Generic/Button";
import { motion } from "motion/react";
import Content from "@/components/Generic/Content";
import Link from "next/link";

export async function getServerSideProps() {
    const visits = await getVisits({ route: '/' });

    return {
        props: {
            visits
        }
    }
}

function DiscordFeature(props: {
    title: string,
    body: string,
    flipped?: boolean
}) {

    return props.flipped ? (
        <div className="h-20 m-auto w-full gap-4 grid grid-cols-2">
            <div />
            <div>
                <h3 className="text-xl font-bold">{props.title}</h3>
                <p>{props.body}</p>
            </div>
        </div>
    ) : (
        <div className="h-20 m-auto w-full gap-4 grid grid-cols-2">
            <div>
                <h3 className="text-xl font-bold">{props.title}</h3>
                <p>{props.body}</p>
            </div>
            <div />
        </div>
    )
}

export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
            <Header highlight={'home'} />
            <Metadata title={'Home Page'} description={'mldchan\'s personal website'} />
            <Main>
                <Offset amt={8} />
                <Content>
                    <Heading level={1}>mldchan's Discord server</Heading>
                    <p className="text-center">mldchan's official Discord server is a place for talking about her projects, YouTube videos and other stuff.</p>
                    
                    <Offset amt={2} />
                    
                    <Heading level={2}>Join link</Heading>

                    <p className="text-center">If you want to join this server, click this very <span className="text-2xl font-bold">big</span> button!</p>

                    <Link href="https://discord.gg/uTWjgy2E4v">
                        <motion.button
                            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                            className={'p-10 px-20 bg-pink-400 hover:bg-pink-300 rounded-lg drop-shadow-md w-full'}>Join now!</motion.button>
                    </Link>

                    <p>Searching for the Akabot support server? You can join <Link href={'/project/akabot'} className="text-pink-400 hover:text-pink-300">the Akabot's support server here</Link>.</p>

                    <Offset amt={4} />

                    <Heading level={2}>Features</Heading>

                    <DiscordFeature title="Custom Bot: Ai" body="mldchan's Ai joins this server as a Discord bot, helping you with anything in the server." />
                    <DiscordFeature title="mldchan announcements" body="mldchan announces everything in this server, meaning you can stay up to date." flipped />
                    <DiscordFeature title="Never-before seen verification" body="When joining the server, you'll see a completely custom never-before seen verification flow." />
                    <DiscordFeature title="Chill Chat" body="We've got a wide variety of channels for you to chat in, including a general channel, a memes channel, channels for gaming etc." flipped />
                    <DiscordFeature title="Self Promotion" body="Promote yourself or your projects in this server. Even mldchan herself may check out your project!" />
                    <DiscordFeature title="Dedicated Project Spaces" body="The Discord server features channels for each of my projects, including Akabot, Astolfo is coming for you etc." flipped />
                    <DiscordFeature title="Feedback & Suggestions" body="You can suggest things for the server or for my projects in the feedback channels." />
                    <DiscordFeature title="Yuri Channels" body="girls kissing,,," flipped />
                    <DiscordFeature title="Catgirl Chaos" body="mldchan is a catgirl, so her insanity will sometimes take over the server." />
                    <DiscordFeature title="Community-Driven" body="Your ideas constantly improve the Discord server for everyone." flipped />

                    <Offset amt={4} />
                </Content>
                <Footer visits={props.visits} route={'/discord'} />
            </Main>
        </>
    );
}
