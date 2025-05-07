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
import Metadata from "@/components/Generic/Metadata";
import Footer from "@/components/Generic/Footer";
import {InferGetServerSidePropsType} from "next";
import {getVisits} from "@/backend/visitsCounter";
import Heading from "@/components/Generic/Heading";
import Offset from "@/components/Generic/Offset";
import {motion} from "motion/react";
import Content from "@/components/Generic/Content";
import Link from "next/link";
import Button from "@/components/Generic/Button";

export async function getServerSideProps() {
    const visits = await getVisits({route: '/'});

    return {
        props: {
            visits
        }
    }
}

function DiscordFeature(props: {
    title: string,
    body: string
}) {

    return <div className={'m-3 bg-[#181818] drop-shadow-lg rounded-lg p-3 transition-all hover:bg-[#222]'}>
        <h3 className="text-2xl font-bold">{props.title}</h3>
        <p className={'text-lg'}>{props.body}</p>
    </div>
}

const highlights = [
    {
        title: 'Custom Bot with Interactive Verification',
        description: 'Enjoy a unique verification process with custom questions, role selection, and guided server tours.'
    },
    {
        title: 'Engaging Channels',
        description: 'From memes to tech discussions, share and discover interesting content in a wide variety of channels.'
    },
    {
        title: 'Gaming Community',
        description: 'Connect with other gamers and discuss your favorite titles like VRChat, Celeste, Mon Bazou, and more.'
    },
    {
        title: 'Creative Spaces',
        description: 'Show off your art, memes, and self-promotion or chat about your favorite media.'
    },
    {
        title: 'Development Hub',
        description: 'Join project discussions for Akabot, Astolfo Mod, uwurandom-rs, Nekosearch, and more.'
    },
    {
        title: 'Interactive Bots',
        description: 'Chat with silly autoresponses, make suggestions, and automate your server with Akabot.'
    },
    {title: 'Fedi Integration', description: 'Stay up to date with new posts from your Fediverse account.'},
    {
        title: 'LGBTQ+ Friendly',
        description: 'Join a welcoming community that celebrates diversity, with dedicated yuri and yaoi channels.'
    },
    {title: 'Fun and Randomness', description: 'Meow, catface, and other nonsense for those who love chaotic fun.'},
    {title: 'Exclusive Project Channels', description: 'Dive deep into projects like AstolfOS, Nekosearch, and more.'}
];

export default function Discord(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
            <Header highlight={'home'}/>
            <Metadata title={'Home Page'} description={'mldchan\'s personal website'}/>
            <Main>
                <Offset amt={8}/>
                <Content>
                    <h1 className={'text-center text-3xl font-bold'}>Join My Personal Discord Server</h1>
                    <p className="text-center text-lg">A chill space for tech enthusiasts, gamers, and fun!</p>

                    <br />

                    <div className={'flex justify-center'}>
                        <Link href={'https://discord.gg/uTWjgy2E4v'}>
                            <Button>Join!</Button>
                        </Link>
                    </div>

                    <p className={'text-gray-500 text-sm'}>Searching for the Akabot support server? You can join <Link
                        href={'/project/akabot'} className="text-pink-400 hover:text-pink-300">the Akabot&apos;s support
                        server here</Link>.</p>

                    <br />

                    <Heading level={2}>Highlights of our Discord server</Heading>

                    {highlights.map(x => (<DiscordFeature title={x.title} body={x.description}/>))}

                    <Heading level={2}>So, what are you waiting for?</Heading>

                    <div className={'flex justify-center'}>
                        <Link href={'https://discord.gg/uTWjgy2E4v'}>
                            <Button>Join!</Button>
                        </Link>
                    </div>

                    <Offset amt={4}/>
                </Content>
                <Footer visits={props.visits} route={'/discord'}/>
            </Main>
        </>
    );
}
