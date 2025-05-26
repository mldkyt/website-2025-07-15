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
import Content from "@/components/Generic/Content";
import Offset from "@/components/Generic/Offset";
import { Header } from "@/components/Generic/Header";
import Metadata from "@/components/Generic/Metadata";
import Footer from "@/components/Generic/Footer";
import { InferGetServerSidePropsType } from "next";
import { getVisits } from "@/backend/visitsCounter";
import Link from "next/link";

export async function getServerSideProps() {
    const visits = await getVisits({ route: "/socials" });

    return {
        props: {
            visits,
        },
    };
}

export default function Socials(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Main>
            <Metadata title={"Socials"} description={"Lunya's socials"} />
            <Header highlight={"socials"} />
            <Content>
                <h1 className={"text-center text-3xl font-bold py-4"}>Lunya&apos;s Contacts and Socials :3</h1>

                <h2 className="text-xl font-bold pb-2 ml-2">contact me</h2>

                <div className="bg-[#222] rounded-lg m-2">
                    <h3 className="font-bold p-2 text-lg">anonymous messages uwu</h3>
                    <p className="p-2 pt-0"><Link href="/anonymous-message" className="underline text-pink-400 hover:text-pink-200">send me an anonymous message</Link>, and i&apos;ll reply to it on <Link href="https://fedi.lunya.pet/@Lunya" className="underline text-pink-400 hover:text-pink-200">my fedi account</Link>!</p>
                </div>

                <div className="bg-[#222] rounded-lg m-2">
                    <h3 className="font-bold p-2 text-lg">discord</h3>
                    <p className="p-2 pt-0">you can <Link href="/discord" className="underline text-pink-400 hover:text-pink-200">join my Discord server</Link>! it&apos;s full of fun!</p>
                    <p className="p-2 pt-0">you can also add me directly, <code className="text-pink-400">uwu.grl</code> is my username! pwease do not abuse this uwu 🥺</p>
                </div>

                <div className="bg-[#222] rounded-lg m-2">
                    <h3 className="font-bold p-2 text-lg">matrix</h3>
                    <p className="p-2 pt-0"><code className="text-pink-400">@mld:mldchan.dev</code></p>
                    <p className="p-2 pt-0">dm&apos;s are open! If you send a request, please notify me about it through another method so I accept it faster 🥺 (even just a simple e-mail like &quot;check element🥺🥺🥺&quot;)</p>
                    <p className="p-2 pt-0">this is a preferred method alongside PGP encrypted e-mail.</p>
                </div>

                <div className="bg-[#222] rounded-lg m-2">
                    <h3 className="font-bold p-2 text-lg">e-mail</h3>
                    <p className="p-2 pt-0"><code className="text-pink-400">mldkyt@proton.me</code></p>
                    <p className="p-2 pt-0">you can send an e-mail here and expect a reply time approximately from 0-12 hours. i reply to all e-mails sent to me.</p>
                    <p className="p-2 pt-0">if you can, please use my PGP encryption key.</p>
                </div>

                <h2 className="text-xl font-bold py-2 ml-2">other accounts uwu :33</h2>

                <div className="bg-[#222] rounded-lg m-2">
                    <h3 className="font-bold p-2 text-lg">fediverse</h3>
                    <p className="p-2 pt-0">I got many fediverse accounts! i post here a lot, most of my posts are meows and :3s and other sillies :3</p>
                    <p className="p-2 pt-0"><Link className="underline text-pink-400 hover:text-pink-200" href="https://fedi.lunya.pet/@Lunya">@Lunya@fedi.lunya.pet</Link></p>
                </div>

                <div className="bg-[#222] rounded-lg m-2">
                    <h3 className="font-bold p-2 text-lg">github and git forges</h3>
                    <p className="p-2 pt-0">i code a TON! here are links to my various github/forgejo profiles :3 you can follow me on them so that you can stay up to date with my projects.</p>
                    <p className="p-2 pt-0"><Link className="underline text-pink-400 hover:text-pink-200" href="https://github.com/LunyaPet">GitHub</Link></p>
                    <p className="p-2 pt-0"><Link className="underline text-pink-400 hover:text-pink-200" href="https://git.lunya.pet/Lunya">lunya on git.lunya.pet</Link></p>
                    <p className="p-2 pt-0"><Link className="underline text-pink-400 hover:text-pink-200" href="https://codeberg.org/LunyaUwU">lunya on Codeberg</Link></p>
                </div>

                <div className="bg-[#222] rounded-lg m-2">
                    <h3 className="font-bold p-2 text-lg">youtube/Peertube</h3>
                    <p className="p-2 pt-0">i post videos here frequently! make sure to subscribe to get the latest video upload notifications!</p>
                    <p className="p-2 pt-0"><Link className="underline text-pink-400 hover:text-pink-200" href="https://youtube.com/@mldchan">lunya on YouTube</Link></p>
                    <p className="p-2 pt-0"><Link className="underline text-pink-400 hover:text-pink-200" href="https://peertube.mldchan.dev/c/mldchan">lunya on PeerTube</Link></p>
                </div>

                <div className="bg-[#222] rounded-lg m-2">
                    <h3 className="font-bold p-2 text-lg">twitch</h3>
                    <p className="p-2 pt-0">sometimes i go live! follow to not miss out :3</p>
                    <p className="p-2 pt-0"><Link className="underline text-pink-400 hover:text-pink-200" href="https://twitch.tv/mldchan">view twitch profile</Link></p>
                </div>

                <div className="bg-[#222] rounded-lg m-2">
                    <h3 className="font-bold p-2 text-lg">tumblr</h3>
                    <p className="p-2 pt-0">platform considered to be dead, but creating an account was the best idea :33</p>
                    <p className="p-2 pt-0"><Link className="underline text-pink-400 hover:text-pink-200" href="https://www.tumblr.com/mldkyt">view tumblr profile</Link></p>
                </div>

                <div className="bg-[#222] rounded-lg m-2">
                    <h3 className="font-bold p-2 text-lg">bluesky</h3>
                    <p className="p-2 pt-0">if you got bluesky, i would recommend following my bridge account, as i&apos;m more likely to post there :3</p>
                    <p className="p-2 pt-0"><Link className="underline text-pink-400 hover:text-pink-200" href="https://bsky.app/profile/lunya.pet">View main Bluesky account</Link></p>
                    <p className="p-2 pt-0"><Link className="underline text-pink-400 hover:text-pink-200" href="https://bsky.app/profile/lunya.fedi.lunya.pet.ap.brid.gy">View bridged fedi account</Link></p>
                </div>

                <div className="bg-[#222] rounded-lg m-2">
                    <h3 className="font-bold p-2 text-lg">instagram</h3>
                    <p className="p-2 pt-0">i am not really active here, but give me a follow here too :3</p>
                    <p className="p-2 pt-0"><Link className="underline text-pink-400 hover:text-pink-200" href="https://instagram.com/lunya.pet">view instagram profile</Link></p>
                </div>

                <Offset amt={6} />
                <Footer visits={props.visits} route={"/socials"} />
            </Content>
        </Main>
    );
}
