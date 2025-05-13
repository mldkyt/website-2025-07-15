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

import React, {act} from "react";

import Main from "@/components/Generic/Main";
import {Header} from "@/components/Generic/Header";
import Metadata from "@/components/Generic/Metadata";
import Footer from "@/components/Generic/Footer";
import {InferGetServerSidePropsType} from "next";
import {getVisits} from "@/backend/visitsCounter";
import Heading from "@/components/Generic/Heading";
import Offset from "@/components/Generic/Offset";
import Content from "@/components/Generic/Content";
import Link from "next/link";
import Button from "@/components/Generic/Button";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

async function getKV(key: string): Promise<number> {
    let value = -1;
    const totalMessagesData = await prisma.discordKV.findFirst({
        where: {
            key
        }
    });

    if (totalMessagesData) {
        value = Number(totalMessagesData.value);
        if (isNaN(value)) {
            throw new Error("value is a NaN in database!");
        }
    }

    return value;
}

async function getData(): Promise<{
    totalMessages: number;
    meows: number;
    catfaces: number;
    activity: {
        date: string;
        count: number;
    }[]
}> {
    const totalMessages = await getKV("totalMessages");
    const meows = await getKV("meows");
    const catfaces = await getKV("catfaces");

    const activity = (await prisma.discordHistory.findMany()).map(x => {
        return {
            date: x.date,
            count: x.messageCount
        }
    });

    return {
        totalMessages,
        meows,
        catfaces,
        activity
    }
}

export async function getServerSideProps() {
    const visits = await getVisits({route: '/'});

    const discordData = await getData();

    return {
        props: {
            visits,
            discordData
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
            <Metadata title={'mldchan\'s Discord server'}
                      description={'Join the official mldchan Discord server today!'}/>
            <Main>
                <Offset amt={8}/>
                <Content>
                    <h1 className={'text-center text-3xl font-bold'}>Join My Personal Discord Server</h1>
                    <p className="text-center text-lg">A chill space for tech enthusiasts, gamers, and fun!</p>

                    <br/>

                    <div className={'flex justify-center'}>
                        <Link href={'https://discord.gg/uTWjgy2E4v'}>
                            <Button>Join!</Button>
                        </Link>
                    </div>

                    <p className={'text-gray-500 text-sm text-center'}>Searching for the Akabot support server? You can
                        join <Link
                            href={'/project/akabot'} className="text-pink-400 hover:text-pink-300">the Akabot&apos;s
                            support
                            server here</Link>.</p>

                    <br/>

                    <h1 className={"text-4xl text-center"}>The best community you can ever join :3</h1>

                    <br/>

                    <div className={'flex flex-row justify-center text-2xl'}>
                        <div className={'flex flex-col w-48 text-center'}>
                            <span className={'font-bold'}>Total Messages</span>
                            <span>{props.discordData.totalMessages === -1 ? "Failed to load" : props.discordData.totalMessages.toString()}</span>
                        </div>
                        <div className={'flex flex-col w-48 text-center'}>
                            <span className={'font-bold'}>Meows</span>
                            <span>{props.discordData.meows === -1 ? "Failed to load" : props.discordData.meows.toString()}</span>
                        </div>
                        <div className={'flex flex-col w-48 text-center'}>
                            <span className={'font-bold'}>:3's</span>
                            <span>{props.discordData.catfaces === -1 ? "Failed to load" : props.discordData.catfaces.toString()}</span>
                        </div>
                    </div>

                    <br/>

                    <h2 className={'text-center font-bold'}>3 most active days:</h2>

                    <br/>

                    <div className={'flex flex-row justify-center text-center'}>
                        <table>
                            <tbody>
                            {(props.discordData.activity.length === 0 ? [{
                                date: 'Failed to load',
                                count: 0
                            }] : props.discordData.activity).map(activity => (
                                <tr key={activity.date}>
                                    <td className={'font-bold w-48'}>{activity.date}</td>
                                    <td className={'w-48'}>{activity.count}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <br/>

                    <Heading level={2}>Highlights of our Discord server</Heading>

                    {highlights.map((x, i) => (<DiscordFeature key={i} title={x.title} body={x.description}/>))}

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
