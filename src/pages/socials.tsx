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
            <Metadata title={"Socials"} description={"mldchan's socials"} />
            <Header highlight={"socials"} />
            <Content>
                <h1 className={"text-center text-2xl font-bold py-4"}>Lunya&apos;s Contacts and Socials :3</h1>

                <h2 className="text-xl font-bold pb-2 ml-2">Contact me</h2>

                <div className="bg-[#222] rounded-lg m-2">
                    <h3 className="font-bold p-2 text-lg">Anonymous Messages</h3>
                    <p className="p-2 pt-0"><Link href="/anonymous-message" className="underline text-pink-400 hover:text-pink-200">Send me an anonymous message</Link>, and I&apos;ll reply to it on <Link href="https://social.mldchan.dev/@mld" className="underline text-pink-400 hover:text-pink-200">my Fediverse page</Link>!</p>
                </div>

                <div className="bg-[#222] rounded-lg m-2">
                    <h3 className="font-bold p-2 text-lg">Discord</h3>
                    <p className="p-2 pt-0">You can <Link href="/discord" className="underline text-pink-400 hover:text-pink-200">join my Discord server</Link>! It&apos;s full of fun!</p>
                    <p className="p-2 pt-0">You can also add me directly, <code className="text-pink-400">uwu.grl</code> is my username! Please note I might remove you for various reasons, so please don&apos;t abuse this.</p>
                </div>

                <div className="bg-[#222] rounded-lg m-2">
                    <h3 className="font-bold p-2 text-lg">Matrix</h3>
                    <p className="p-2 pt-0"><code className="text-pink-400">@mld:mldchan.dev</code></p>
                    <p className="p-2 pt-0">DM&apos;s are open! If you send a request, please notify me about it through another method so I accept it faster. (even just a simple e-mail like &quot;check Element&quot;)</p>
                    <p className="p-2 pt-0">This is a preferred method alongside PGP encrypted e-mail.</p>
                </div>

                <div className="bg-[#222] rounded-lg m-2">
                    <h3 className="font-bold p-2 text-lg">E-mail</h3>
                    <p className="p-2 pt-0"><code className="text-pink-400">mldkyt@proton.me</code></p>
                    <p className="p-2 pt-0">You can send an e-mail here and expect a reply time approximately from 0-12 hours. I reply to all e-mails sent to me.</p>
                    <p className="p-2 pt-0">If you can, please use my PGP encryption key.</p>
                </div>

                <h2 className="text-xl font-bold py-2 ml-2">Other social accounts</h2>

                <div className="bg-[#222] rounded-lg m-2">
                    <h3 className="font-bold p-2 text-lg">Fediverse</h3>
                    <p className="p-2 pt-0">I got many fediverse accounts! I post here a lot, most of my posts are meows and :3s and other sillies :3</p>
                    <p className="p-2 pt-0"><Link className="underline text-pink-400 hover:text-pink-200" href="https://social.mldchan.dev/@mld">@mld@social.mldchan.dev</Link></p>
                    <p className="p-2 pt-0"><Link className="underline text-pink-400 hover:text-pink-200" href="https://fedi.lunya.pet/@Lunya">@Lunya@fedi.lunya.pet</Link></p>
                </div>

                <div className="bg-[#222] rounded-lg m-2">
                    <h3 className="font-bold p-2 text-lg">GitHub and git forges</h3>
                    <p className="p-2 pt-0">I code a TON! Here are links to my various GitHub/Forgejo profiles :3 You can follow me on them so that you can stay up to date with my projects.</p>
                    <p className="p-2 pt-0"><Link className="underline text-pink-400 hover:text-pink-200" href="https://github.com/uwugrl">GitHub</Link></p>
                    <p className="p-2 pt-0"><Link className="underline text-pink-400 hover:text-pink-200" href="https://git.lunya.pet/Lunya">Lunya on git.lunya.pet</Link></p>
                    <p className="p-2 pt-0"><Link className="underline text-pink-400 hover:text-pink-200" href="https://codeberg.org/mldchan">mldchan on Codeberg</Link></p>
                    <p className="p-2 pt-0"><Link className="underline text-pink-400 hover:text-pink-200" href="https://git.gay/mld">mld on git.gay</Link></p>
                </div>

                <div className="bg-[#222] rounded-lg m-2">
                    <h3 className="font-bold p-2 text-lg">YouTube/Peertube</h3>
                    <p className="p-2 pt-0">I post videos here frequently! Make sure to subscribe to get the latest video upload notifications! PeerTube is pretty much decentralized YouTube and you can subscribe through the second link.</p>
                    <p className="p-2 pt-0"><Link className="underline text-pink-400 hover:text-pink-200" href="https://youtube.com/@mldchan">mldchan on YouTube</Link></p>
                    <p className="p-2 pt-0"><Link className="underline text-pink-400 hover:text-pink-200" href="https://peertube.mldchan.dev/c/mldchan">mldchan on PeerTube</Link></p>
                </div>

                <div className="bg-[#222] rounded-lg m-2">
                    <h3 className="font-bold p-2 text-lg">Twitch</h3>
                    <p className="p-2 pt-0">Sometimes I go live! Follow to not miss out :3</p>
                    <p className="p-2 pt-0"><Link className="underline text-pink-400 hover:text-pink-200" href="https://twitch.tv/mldchan">View Twitch profile</Link></p>
                </div>

                <div className="bg-[#222] rounded-lg m-2">
                    <h3 className="font-bold p-2 text-lg">Tumblr</h3>
                    <p className="p-2 pt-0">Yes, I got a Tumblr! You can follow me if you have an account.</p>
                    <p className="p-2 pt-0"><Link className="underline text-pink-400 hover:text-pink-200" href="https://www.tumblr.com/mldkyt">View Tumblr profile</Link></p>
                </div>

                <div className="bg-[#222] rounded-lg m-2">
                    <h3 className="font-bold p-2 text-lg">Bluesky</h3>
                    <p className="p-2 pt-0">Although I don&apos;t use it much, you can follow my Bluesky account! If you got a Bluesky account, but not a fedi account, you can also follow my bridged profile there.</p>
                    <p className="p-2 pt-0"><Link className="underline text-pink-400 hover:text-pink-200" href="https://bsky.app/profile/lunya.pet">View main Bluesky account</Link></p>
                    <p className="p-2 pt-0"><Link className="underline text-pink-400 hover:text-pink-200" href="https://bsky.app/profile/mld.social.mldchan.dev.ap.brid.gy">View bridged fedi account</Link></p>
                </div>

                <div className="bg-[#222] rounded-lg m-2">
                    <h3 className="font-bold p-2 text-lg">Instagram</h3>
                    <p className="p-2 pt-0">I am not really active here, but give me a follow here too :3</p>
                    <p className="p-2 pt-0"><Link className="underline text-pink-400 hover:text-pink-200" href="https://instagram.com/_mldchan_">View Instagram profile</Link></p>
                </div>

                <Offset amt={6} />
                <Footer visits={props.visits} route={"/socials"} />
            </Content>
        </Main>
    );
}
