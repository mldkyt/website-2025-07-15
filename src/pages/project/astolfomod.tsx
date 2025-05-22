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
                <Heading level={1}>Astolfo Mod</Heading>

                <div className="w-full flex flex-row text-center">
                    <div onClick={() => setTab('description')} className={`${tab === 'description' ? 'border-b-2 border-b-[#ff77ff]' : ''} py-2 w-full cursor-pointer`}>Description</div>
                    <div onClick={() => setTab('gallery')} className={`${tab === 'gallery' ? 'border-b-2 border-b-[#ff77ff]' : ''} py-2 w-full cursor-pointer`}>Gallery</div>
                    <div onClick={() => setTab('changelog')} className={`${tab === 'changelog' ? 'border-b-2 border-b-[#ff77ff]' : ''} py-2 w-full cursor-pointer`}>Changelog</div>
                </div>

                {tab === 'description' && <>
                    <Heading level={2}>What does this mod add?</Heading>

                    <ul className={'ml-4 list-disc'}>
                        <li><b>Astolfo in 3 outfits</b> - Astolfo Schoolgirl, Astolfo Armour, and Astolfo in Casual outfit
                        </li>
                        <li><b>Felix Argyle</b></li>
                        <li><b>Hideri Kanzaki</b></li>
                        <li><b>Venti</b></li>
                        <li><b>Rimuru</b></li>
                        <li><b>Nagisa Shiota</b></li>
                        <li><b>Sieg</b> (Fate/Apocrypha)</li>
                        <li><b>Bridget</b> <i>(I know she&apos;s a transgender girl but I included her because why not)</i></li>
                    </ul>

                    <Heading level={2}>Commands</Heading>

                    <ul className={'ml-4 list-disc'}>
                        <li>
                            <code>/duplicatecuties &lt;amount&gt; &lt;range&gt;</code> - Duplicate all of the added mobs
                            within the
                            range amount times. The mod doesn&apos;t have any limits in the 2 parameters, so entering big numbers
                            might
                            cause your
                            game to crash!
                        </li>
                        <li>
                            <code>/despawn &lt;selector&gt;</code> - This command is simple and allows you to &quot;kill&quot;
                            monsters
                            without the animation. This prevents the particles from death spawning and lagging your game if
                            you have
                            too many mobs
                            from this mod spawned.
                        </li>
                        <li>
                            <code>/cuterain &lt;iterations&gt; &lt;range&gt; &lt;height&gt;</code> - This command makes the
                            mobs
                            above rain from the sky. It runs how many times iterations is, spawning mobs in the range
                            provided,
                            spawning them in
                            the specified height. Every iteration spawns 1 of each mob above, excluding creative mobs.
                        </li>
                    </ul>

                    <Heading level={2}>Creative items and mobs</Heading>

                    <ul className={'ml-4 list-disc'}>
                        <li><b>Astolfo Attractor</b> - The text &quot;gay&quot; in the menu, attracts only variants of Astolfo.</li> 
                        <li><b>Astolfo Repellent</b> - A Felix Argyle entity which repels all Astolfos from its location.
                        </li>
                        <li><b>Monster White</b> - No crafting recipe yet, gives you speed and jump boost and gives you
                            trans rights
                            🏳️‍⚧️❤️
                        </li>
                    </ul>

                    <Heading level={2}>Video about the mod</Heading>

                    <p>I&apos;ve also made a video about the mod on my YouTube channel, so if you want to watch that, you can do
                        so:</p>

                    <iframe width="400" height="225"
                            src="https://www.youtube-nocookie.com/embed/bBvrp8puvdw?si=1KTa9xR-AzxIyX_2"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

                    <Heading level={2}>Supporting this mod</Heading>

                    <H3>1. Suggestions</H3>

                    <p>
                        The simplest you can do for now is to <b>create an idea suggestion</b> for the mod using a <Link
                        className="text-pink-400 hover:text-pink-300"
                        href="https://github.com/uwugrl/AstolfoForge/issues"
                    >GitHub issue</Link>.
                    </p>

                    <H3>2. Reporting bugs</H3>

                    <p>
                        If you find any bug in the mod, <b>you can report it</b> using <Link
                        className="text-pink-400 hover:text-pink-300"
                        href="https://github.com/uwugrl/AstolfoForge/issues">GitHub issues</Link> for it to be fixed.
                        It will be fixed once I get some free time.
                    </p>

                    <H3>3. Financial support</H3>

                    <p><Link href={'/donate'} className="text-pink-400 hover:text-pink-300">You can donate me using various methods here.</Link>
                     I accept donations on all of them.</p>
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
                        <Button fullWidth>Open Modrinth page</Button>
                    </Link>
                    <Link href="https://github.com/uwugrl/AstolfoForge/releases/latest">
                        <Button fullWidth>GitHub</Button>
                    </Link>
                    <Link href={'/discord'}>
                        <Button fullWidth>Get support in the Discord server!</Button>
                    </Link>
                </div>

                <Offset amt={3}/>
                <Footer visits={props.visits} route={'/project/astolfomod'}
                        />
            </Content>
        </Main>
    )
}
