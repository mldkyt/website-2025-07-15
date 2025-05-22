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
import Image from "next/image";

import bg from '@/images/bg.png';
import Content from "@/components/Generic/Content";
import Offset from "@/components/Generic/Offset";
import Link from "next/link";

import akabot from "@/images/akabot.png";
import catgirlNonsense from "@/images/catgirlnonsense.png";
import astolfoMod from "@/images/astolfomod/biome.png";

export async function getServerSideProps() {
    const visits = await getVisits({route: '/'});

    return {
        props: {
            visits
        }
    }
}

export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
            <Metadata title={'Home Page'} description={'mldchan\'s personal website'}/>
            <Main>

                <div className="bg-gradient-to-b from-[#351036] to-[#111]">

                    <Content>
                        <Header highlight={'home'}/>
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="m-auto w-max">
                                <Image
                                    src={bg}
                                    alt={"Lunya anime girl peace sign"}
                                    className="w-[50vw] max-h-[1000px] object-contain" 
                                />
                            </div>
                            <div>
                                <h1 className="font-bold text-2xl">Haiii, I&apos;m Lunya :33</h1> 
                                <p className={"py-2"}> 
                                    I&apos;m a part-time developer, some-time Mon Bazou mod creator, and full-time trans catgirl :3
                                </p>
                                <p className={"py-2"}>
                                    I have a <Link className="underline text-pink-400 hover:text-pink-200" href="https://youtube.com/@mldchan">YouTube channel</Link> where I play games and tinker with tech. Go check it out~
                                </p>
                                <p className="py-2">
                                    My most popular project is <Link className="underline text-pink-400 hover:text-pink-200" href='/project/akabot'>Akabot</Link>, a general purpose Discord bot. I also used to make My Summer Car mods, but most of them are private due to the <Link
                                    href={"https://social.mldchan.dev/notes/a1tsf5xe9kiu00r2"}
                                    className={"underline text-pink-400 hover:text-pink-200"}
                                >
                                    community&apos;s backlash
                                </Link>.
                                </p>
                                <p className={"py-2"}>
                                    Read my <Link href="/introduction" className="underline text-pink-400 hover:text-pink-200">introduction</Link> for more!
                                </p>
                            </div>
                        </div>
                    </Content>
                    <Offset amt={3} />
                </div>
                <Content>
                    {/* Projects */}
                    <div className="flex flex-row justify-between">
                        <h1 className="text-2xl font-bold ml-4">Projects</h1>
                        <Link className="text-2xl underline mr-4" href='/projects'>more &#8594;</Link>
                    </div>

                    <div className="grid lg:grid-cols-3">
                        <Link href={"/project/akabot"} className="bg-[#222] rounded-xl m-4">
                            <Image className="h-[256px] object-cover rounded-t-xl" src={akabot} alt="Akabot Logo" width={1024} height={1024}  /> 
                            <h1 className="font-bold text-xl m-2">Akabot</h1>
                            <p className="m-2">Akabot is a Discord bot with lots of features.</p>
                        </Link>
                        <Link href={'/project/catgirlnonsense'} className="bg-[#222] rounded-xl m-4">
                            <Image className="h-[256px] object-cover rounded-t-xl" src={catgirlNonsense} alt="Akabot Logo" width={1024} height={1024}  /> 
                            <h1 className="font-bold text-xl m-2">Catgirl Nonsense</h1>
                            <p className="m-2">Catgirl nonsense generator.</p>
                        </Link>
                        <Link href={'/project/astolfomod'} className="bg-[#222] rounded-xl m-4">
                            <Image className="h-[256px] object-cover rounded-t-xl" src={astolfoMod} alt="Akabot Logo" width={1024} height={1024} /> 
                            <h1 className="font-bold text-xl m-2">Astolfo Mod</h1>
                            <p className="m-2">A Minecraft mod that adds many non-binary, transgender and femboy characters to the game.</p>
                        </Link>
                    </div>


                    {/* Other */}
                    <h1 className="text-2xl font-bold ml-4">Other</h1>

                    <div className="m-4">
                        <div className="flex flex-row justify-between items-center">
                            <h1 className="font-bold text-xl m-2">Self-hosting</h1>
                            <Link href="/services" className="text-xl mr-4 underline">services &#8594;</Link> 
                        </div>
                        <p className="m-2">I host a few services, including my own <Link href="https://social.mldchan.dev" className="underline text-pink-400 hover:text-pink-200">Sharkey</Link> and <Link href="https://git.lunya.pet" className="underline text-pink-400 hover:text-pink-200">Forgejo</Link> instances. Most of these self-hosted services are for personal use only, or are shared across friends.</p>
                    </div>
                    <div className="m-4">
                        <div className="flex flex-row justify-between items-center">
                            <h1 className="font-bold text-xl m-2">Video content creation</h1>
                            <Link href="https://youtube.com/@mldchan" className="text-xl mr-4 underline">youtube &#8594;</Link> 
                        </div>
                        <p className="m-2">I post videos on <Link href="https://youtube.com/@mldchan" className="underline text-pink-400 hover:text-pink-200">YouTube</Link>, <Link className="underline text-pink-400 hover:text-pink-200" href="https://peertube.mldchan.dev/c/mldchan">PeerTube</Link> and <Link className="underline text-pink-400 hover:text-pink-200" href="https://tiktok.com/@grl.uwu">TikTok</Link>. I&apos;m most active on YouTube. My Celeste videos are quite successful.</p> 
                    </div>
                    <div className="m-4">
                        <div className="flex flex-row justify-between items-center">
                            <h1 className="font-bold text-xl m-2">Art</h1>
                            <Link href="/art" className="text-xl mr-4 underline">gallery &#8594;</Link> 
                        </div>
                        <p className="m-2">One of my kawaii arts is the website logo. Another one is the <Link href="https://social.mldchan.dev" className="underline text-pink-400 hover:text-pink-200">logo of my Sharkey instance</Link>.</p>
                    </div>
                    <div className="m-4">
                        <div className="flex flex-row justify-between items-center">
                            <h1 className="font-bold text-xl m-2">Discord Server</h1>
                            <Link href="/services" className="text-xl mr-4 underline">join &#8594;</Link> 
                        </div>
                        <p className="m-2">My server is a chill space for tech enthusiasts and gamers. Fun included!</p>
                    </div>
                    <Offset amt={3} />
                    <Footer visits={props.visits} route={'/'} />
                </Content>
            </Main>
        </>
    );
}
