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

import React from "react";

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
        title: 'Lunya\'s love',
        description: 'enjoy a custom discord bot with a bunch of silly features :33333333'
    },
    {
        title: 'channels',
        description: 'we got them. for everything :3'
    },
    {
        title: 'gaming',
        description: 'gaming related channels related to what Lunya plays on her yt! :3'
    },
    {
        title: 'creative spaces',
        description: 'art, music, media, we got them all.'
    },
    {
        title: 'dev hub',
        description: 'discuss any of my projects within dedicated channels in the discord server! :3'
    },
    {
        title: 'bots',
        description: 'we got akabot :3 and that\'s about it :3'
    },
    {
        title: 'lgbtq+ friendly',
        description: 'we are cutie friendly. we also got dedicated anime girls kissing and anime boys kissing channels :3333'
    },
    {title: 'fun', description: 'dedicated channel for meowing, :3 because why not! it\'s needed if i am in the server :3'}
];

export default function Discord(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
            <Header highlight={'home'}/>
            <Metadata title={'Lunya\'s Discord server'}
                      description={'Join the official Lunya Discord server today!'}/>
            <Main>
                <Content>
                    <h1 className={'text-center text-3xl font-bold'}>join my discord server!</h1>
                    <p className="text-center text-lg">a discord server for everything about Lunya :3</p>

                    <br/>

                    <div className={'flex justify-center'}>
                        <Link href={'https://discord.gg/uTWjgy2E4v'}>
                            <Button>Join!</Button>
                        </Link>
                    </div>

                    <p className={'text-gray-500 text-sm text-center'}>akabot support? please join <Link
                            href={'/project/akabot'} className="text-pink-400 hover:text-pink-300">the Akabot&apos;s
                            akabot support</Link> here uwu</p>

                    <br/>

                    <h1 className={"text-4xl text-center"}>the best community one can join!!! :333 </h1>

                    <br/>

                    <div className={'flex flex-row justify-center text-2xl'}>
                        <div className={'flex flex-col w-48 text-center'}>
                            <span className={'font-bold'}>messages :3</span>
                            <span>{props.discordData.totalMessages === -1 ? "Failed to load" : props.discordData.totalMessages.toString()}</span>
                        </div>
                        <div className={'flex flex-col w-48 text-center'}>
                            <span className={'font-bold'}>meows :3</span>
                            <span>{props.discordData.meows === -1 ? "Failed to load" : props.discordData.meows.toString()}</span>
                        </div>
                        <div className={'flex flex-col w-48 text-center'}>
                            <span className={'font-bold'}>:3&apos;s :3</span>
                            <span>{props.discordData.catfaces === -1 ? "Failed to load" : props.discordData.catfaces.toString()}</span>
                        </div>
                    </div>

                    <br/>

                    <h2 className={'text-center font-bold'}>we got lots of activity! :3</h2>
                    <p className="text-gray-400 text-sm text-center">3 most active days within the last week</p>

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

                    <Heading level={2}>highlights</Heading>

                    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
                        {highlights.map((x, i) => (<DiscordFeature key={i} title={x.title} body={x.description}/>))}
                    </div>

                    <Heading level={2}>so pwease join? 🥺</Heading>

                    <div className={'flex justify-center'}>
                        <Link href={'https://discord.gg/uTWjgy2E4v'}>
                            <Button>Join!</Button>
                        </Link>
                    </div>

                    <Offset amt={4}/>
                    <Footer visits={props.visits} route={'/discord'}/>
                </Content>
            </Main>
        </>
    );
}
