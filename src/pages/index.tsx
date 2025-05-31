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
import Image from "next/image";
import {formatDistance, parseISO} from 'date-fns';

import Content from "@/components/Generic/Content";
import Offset from "@/components/Generic/Offset";
import Link from "next/link";

import akabot from "@/images/akabot.png";
import catgirlNonsense from "@/images/catgirlnonsense.png";
import astolfoMod from "@/images/astolfomod/biome.png";
import {fetchLatestPost} from "@/backend/fediPostFetch";

export async function getServerSideProps() {
    const visits = await getVisits({route: '/'});

    const post = await fetchLatestPost();

    let strippedText = post.text;
    if (strippedText.length > 300) {
        strippedText = `${strippedText.slice(0, 297)}...`;
    }

    return {
        props: {
            visits,
            post,
            postRelativeDate: formatDistance(parseISO(post.createDate), new Date(), { addSuffix: true }),
            strippedText
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
                        <h1 className="font-bold text-center text-5xl">haii, i&apos;m Lunya :33</h1>
                    </Content>
                    <Offset amt={2} />
                </div>
                <Content>
                    {/*About me*/}

                    <div className="mx-4">
                        <p className={"py-2"}>
                            i&apos;m a transgender catgirl, and i <Link className="underline text-pink-400 hover:text-pink-200 transition-all" href={"https://git.lunya.pet/Lunya"}>code</Link>! alongside coding, i also <Link className="underline text-pink-400 hover:text-pink-200 transition-all" href={"https://youtube.com/@mldchan"}>make videos</Link>!
                        </p>
                        <p className="py-2">
                            my most successfull project is <Link className="underline text-pink-400 hover:text-pink-200 transition-all" href='/project/akabot'>Akabot</Link>, a general purpose discord bot with a lot of features :3 it&apos;s one of the <Link className="underline text-pink-400 hover:text-pink-200 transition-all" href={"/projects"}>cool projects</Link> you can find!
                        </p>
                        <p className={"py-2"}>
                            you should consider reading my <Link href="/introduction" className="underline text-pink-400 hover:text-pink-200 transition-all">intro</Link> for a bit about me, it will tell you a bit about my online behaviour and how to chat with me :3
                        </p>
                    </div>

                    {/*Latest post*/}

                    <Offset amt={1} />

                    <div className="flex flex-row justify-between">
                        <h1 className="text-2xl font-bold ml-4">check out my status :3</h1>
                    </div>

                    <Link href={props.post.link}>
                        <div className={"m-4"}>
                            <div className={"flex flex-row items-center"}>
                                <Image className={"rounded-full"} src={"https://fedi.lunya.pet/files/3230dfa7-23f1-4cdb-9202-b8c9c7396634.webp"} alt={"Lunya's Profile Picture"} width={32} height={32}/>
                                <span className={"ml-4 font-bold text-lg"}>Lunya UwU</span>
                                <span className={"ml-6 text-gray-400 text-sm"}>{props.postRelativeDate}</span>
                            </div>
                            <p className={"m-1 ml-0"}>{props.strippedText}</p>
                        </div>
                    </Link>

                    <Offset amt={1} />

                    {/* Projects */}
                    <div className="flex flex-row justify-between">
                        <h1 className="text-2xl font-bold ml-4">projects</h1>
                        <Link className="text-2xl underline mr-4" href='/projects'>more &#8594;</Link>
                    </div>

                    <div className="grid lg:grid-cols-3">
                        <Link href={"/project/akabot"} className="bg-[#222] rounded-xl m-4">
                            <Image className="h-[256px] object-cover rounded-t-xl" src={akabot} alt="Akabot Logo" width={1024} height={1024}  /> 
                            <h1 className="font-bold text-xl m-2">Akabot</h1>
                            <p className="m-2">a general purpose discord bot with a lot of features.</p>
                        </Link>
                        <Link href={'/project/catgirlnonsense'} className="bg-[#222] rounded-xl m-4">
                            <Image className="h-[256px] object-cover rounded-t-xl" src={catgirlNonsense} alt="Akabot Logo" width={1024} height={1024}  /> 
                            <h1 className="font-bold text-xl m-2">Catgirl Nonsense</h1>
                            <p className="m-2">catgirls dreams mmwrmwamrwamrmwa &gt;/////////&lt; wrwageiogjaa uwu :3 *pats you*</p>
                        </Link>
                        <Link href={'/project/astolfomod'} className="bg-[#222] rounded-xl m-4">
                            <Image className="h-[256px] object-cover rounded-t-xl" src={astolfoMod} alt="Akabot Logo" width={1024} height={1024} /> 
                            <h1 className="font-bold text-xl m-2">Astolfo Mod</h1>
                            <p className="m-2">a silly minecraft mod adding femboys and trans girls into minecraft :3</p>
                        </Link>
                    </div>


                    {/* Other */}
                    <h1 className="text-2xl font-bold ml-4">other things i do uwu</h1>

                    <div className="m-4">
                        <div className="flex flex-row justify-between items-center">
                            <h1 className="font-bold text-xl m-2">self hosting</h1>
                            <Link href="/services" className="text-xl mr-4 underline">services &#8594;</Link> 
                        </div>
                        <p className="m-2">i run a few services for myself and/or friends, for example <Link href="https://fedi.lunya.pet/@Lunya" className="underline text-pink-400 hover:text-pink-200">Sharkey</Link> for frens and <Link href="https://git.lunya.pet" className="underline text-pink-400 hover:text-pink-200">Forgejo</Link> for my code :3</p>
                    </div>
                    <div className="m-4">
                        <div className="flex flex-row justify-between items-center">
                            <h1 className="font-bold text-xl m-2">videos</h1>
                            <Link href="https://youtube.com/@mldchan" className="text-xl mr-4 underline">youtube &#8594;</Link> 
                        </div>
                        <p className="m-2">i put videos on <Link href="https://youtube.com/@mldchan" className="underline text-pink-400 hover:text-pink-200">yt</Link>, <Link className="underline text-pink-400 hover:text-pink-200" href="https://peertube.mldchan.dev/c/mldchan">peertube</Link> and <Link className="underline text-pink-400 hover:text-pink-200" href="https://tiktok.com/@grl.uwu">TikTok</Link> :3 i still use youtube the most</p> 
                    </div>
                    <div className="m-4">
                        <div className="flex flex-row justify-between items-center">
                            <h1 className="font-bold text-xl m-2">art</h1>
                            <Link href="/art" className="text-xl mr-4 underline">gallery &#8594;</Link> 
                        </div>
                        <p className="m-2">i dont draw much but i did kawaii art for this website and also my <Link href="https://fedi.lunya.pet" className="underline text-pink-400 hover:text-pink-200">Sharkey instance</Link> :3 for example</p>
                    </div>
                    <div className="m-4">
                        <div className="flex flex-row justify-between items-center">
                            <h1 className="font-bold text-xl m-2">discord community</h1>
                            <Link href="/discord" className="text-xl mr-4 underline">join &#8594;</Link> 
                        </div>
                        <p className="m-2">i run a silly <Link className="underline text-pink-400 hover:text-pink-200" href={"/discord"}>discord server</Link> with silly features :3 you should totally join :33</p>
                    </div>
                    <Offset amt={3} />
                    <Footer visits={props.visits} route={'/'} />
                </Content>
            </Main>
        </>
    );
}
