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
import React, { useState } from "react";

import Main from "@/components/Generic/Main";
import {Header} from "@/components/Generic/Header";
import Content from "@/components/Generic/Content";
import Offset from "@/components/Generic/Offset";
import Heading from "@/components/Generic/Heading";
import Link from "next/link";
import Image from "next/image";

import armor from '@/images/astolfomod/armor.png';
import astolfoFlower from '@/images/astolfomod/astolfoflower.png';
import biome from '@/images/astolfomod/biome.png';
import casual from '@/images/astolfomod/casual.png';
import crowd from '@/images/astolfomod/crowd.png';
import schoolgirl from '@/images/astolfomod/schoolgirl.png';
import Metadata from "@/components/Generic/Metadata";
import Footer from "@/components/Generic/Footer";
import {InferGetServerSidePropsType} from "next";
import {getVisits} from "@/backend/visitsCounter";
import Button from "@/components/Generic/Button";

const H3 = (props: { children: string }) => <h3 className={'text-xl font-bold'}>{props.children}</h3>;

export async function getServerSideProps() {
    const visits = await getVisits({route: '/project/astolfomod'});

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
            <Metadata title={'Astolfo Mod'}
                      description={'Astolfo Mod for Minecraft, a mod that adds Astolfo and other characters to the game.'}/>
            <Header highlight={'projects'}/>
            <Content>
                <Heading level={1}>astolfo mod uwu</Heading>

                <div className="w-full flex flex-row text-center">
                    <div onClick={() => setTab('description')} className={`${tab === 'description' ? 'border-b-2 border-b-[#ff77ff]' : ''} py-2 w-full cursor-pointer`}>description</div>
                    <div onClick={() => setTab('gallery')} className={`${tab === 'gallery' ? 'border-b-2 border-b-[#ff77ff]' : ''} py-2 w-full cursor-pointer`}>gallery</div>
                    <div onClick={() => setTab('changelog')} className={`${tab === 'changelog' ? 'border-b-2 border-b-[#ff77ff]' : ''} py-2 w-full cursor-pointer`}>changelog</div>
                </div>

                {tab === 'description' && <>
                    <Heading level={2}>mod features :3</Heading>

                    <ul className={'ml-4 list-disc'}>
                        <li><b>Astolfo in 3 outfits :3</b> - astolfo is schoolgirl, casual and armour outfits :3
                        </li>
                        <li><b>Felix</b></li>
                        <li><b>Hideri Kanzaki</b></li>
                        <li><b>Venti</b></li>
                        <li><b>Rimuru</b></li>
                        <li><b>Nagisa Shiota</b></li>
                        <li><b>Sieg</b> (Fate/Apocrypha)</li>
                        <li><b>Bridget</b> <i>(i know she&apos;s a girl and she&apos;s in a mod about femboys, but whatever :3)</i></li>
                    </ul>

                    <Heading level={2}>commands :3</Heading>

                    <ul className={'ml-4 list-disc'}>
                        <li>
                            <code>/duplicatecuties &lt;amount&gt; &lt;range&gt;</code> - duplicate all of the femboys in range :3
                        </li>
                        <li>
                            <code>/despawn &lt;selector&gt;</code> - despawns anything matching the selector without playing the animation :3
                        </li>
                        <li>
                            <code>/cuterain &lt;iterations&gt; &lt;range&gt; &lt;height&gt;</code> - makes femboys rain from the sky :3
                        </li>
                    </ul>

                    <Heading level={2}>creative items</Heading>

                    <ul className={'ml-4 list-disc'}>
                        <li><b>Astolfo Attractor</b> - attracts all Astolfos to your location</li> 
                        <li><b>Astolfo Repellent</b> - entity which repells Astolfos from it
                        </li>
                        <li><b>Monster White</b> - a drink ig 💖🏳️‍⚧️
                        </li>
                    </ul>

                    <Heading level={2}>video</Heading>

                    <p>i made a video about this mod too :3</p>

                    <iframe width="400" height="225"
                            src="https://www.youtube-nocookie.com/embed/bBvrp8puvdw?si=1KTa9xR-AzxIyX_2"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

                    <Heading level={2}>Supporting this mod</Heading>

                    <p><Link href={'/donate'} className="text-pink-400 hover:text-pink-300">pwease donate uwu 🥺 :3</Link></p>
                </>}

                {tab === 'gallery' && <div className="grid grid-cols-1 lg:grid-cols-2">
                    <Image src={crowd} alt="Astolfo Crowd in Minecraft" className={'rounded-lg p-1'}/>
                    <Image src={biome} alt="Astolfo Biome in Minecraft" className={'rounded-lg p-1'}/>
                    <Image src={casual} alt="Casual Astolfo in Minecraft" className={'rounded-lg p-1'}/>
                    <Image src={armor} alt="Armored Astolfo in Minecraft" className={'rounded-lg p-1'}/>
                    <Image src={schoolgirl} alt="School girl outfit Astolfo in Minecraft"
                            className={'rounded-lg p-1'}/>
                    <Image src={astolfoFlower} alt="Astolfo Flower in Minecraft" className={'rounded-lg p-1'}/>
                </div> }

                {tab === 'changelog' && <>
                    <H3>v1.2</H3>
                    <ul className={'ml-6 list-disc'}>
                        <li>Added Hideri</li>
                        <li>Added Bridget</li>
                        <li>Added Venti</li>
                        <li>Added /cuterain</li>
                        <li>Added /despawn</li>
                        <li>Added /duplicatecuties</li>
                        <li>Removed /duplicateastolfos</li>
                        <li>Added Rimuru</li>
                        <li>Added Nagisa</li>
                        <li>Added Sieg</li>
                    </ul>
                    <H3>v1.1</H3>
                    <ul className={'ml-6 list-disc'}>
                        <li>Added Astolfo Sword</li>
                        <li>Added Astolfo Biome</li>
                        <li>Added Felix Agryle</li>
                    </ul>
                    <H3>v1.0</H3>
                    <ul className={'ml-6 list-disc'}>
                        <li>First release</li>
                    </ul>
                </>}

                <Offset amt={2} />

                <div className="flex flex-col gap-2">
                    <Link href="https://modrinth.com/mod/astolfo-mod">
                        <Button fullWidth>modrinth</Button>
                    </Link>
                    <Link href="https://github.com/LunyaPet/AstolfoForge/releases/latest">
                        <Button fullWidth>github</Button>
                    </Link>
                    <Link href={'/discord'}>
                        <Button fullWidth>join Discord for support and suggestions :3</Button>
                    </Link>
                </div>

                <Offset amt={3}/>
                <Footer visits={props.visits} route={'/project/astolfomod'}
                        />
            </Content>
        </Main>
    )
}
