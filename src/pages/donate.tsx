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

import React, { useState } from "react";

import Main from "@/components/Generic/Main";
import { Header } from "@/components/Generic/Header";
import Content from "@/components/Generic/Content";
import Offset from "@/components/Generic/Offset";
import Link from "next/link";
import Metadata from "@/components/Generic/Metadata";
import Button from "@/components/Generic/Button";
import { motion } from "motion/react";
import Footer from "@/components/Generic/Footer";
import { InferGetServerSidePropsType } from "next";
import { getVisits } from "@/backend/visitsCounter";
import Heading from "@/components/Generic/Heading";

export async function getServerSideProps() {
    const visits = await getVisits({ route: "/donate" });

    return {
        props: {
            visits,
        },
    };
}

export default function Donate(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [showKofiWidget, setShowKofiWidget] = useState(true);

    return (
        <Main>
            <Metadata title={"Donate"} description={"Donate to mldchan to support their projects!"} />
            <Header highlight={"donate"} />
            <Content>
                <Offset amt={4} />
                <Heading level={1}>Donate</Heading>
                <p>Even if I try to run as much on free stuff as possible, it&apos;s impossible to run everything completely free of charge.</p>
                <p>For example, servers cost money -- regardless if it is running at your home or it&apos;s a VPS.</p>

                {showKofiWidget && (
                    <>
                        <Button onClick={() => setShowKofiWidget(false)}>Hide Ko-fi widget</Button>{" "}
                        <iframe id="kofiframe" src="https://ko-fi.com/mldchan/?hidefeed=true&widget=true&embed=true&preview=true" className="border-none w-full p-[4px] bg-[#f9f9f9]" height="712" title="mldchan"></iframe>
                    </>
                )}

                <Heading level={2}>Past Donators</Heading>

                <p>Here&apos;s a list of past donators to me - Thank you all!</p>

                <ul className={"list-disc ml-4"}>
                    <li>
                        <strong>LeroMusic</strong> (Ko-fi) - $15
                    </li>
                    <li>
                        <strong>DriftBot</strong> (Ko-fi) - $10
                    </li>
                    <li>
                        <strong>Creitin Gameplays</strong> (GitHub Sponsors) - $2
                    </li>
                </ul>

                <Heading level={2}>How do I donate?</Heading>
                <p>If you do got some spare money which you absolutely don&apos;t need for anything else, you can donate to me on the following platforms:</p>
                <ul className={"list-disc ml-4"}>
                    <li>
                        <motion.span whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}>
                            <Link href={"https://liberapay.com/mldchan/donate"} className={"text-pink-400 hover:text-pink-200"}>
                                Liberapay
                            </Link>
                        </motion.span>{" "}
                        is one way to donate to me. It allows recurring payments and is open source.
                    </li>
                    <li>
                        <motion.span whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}>
                            <Link href={"https://ko-fi.com/mldchan"} className={"text-pink-400 hover:text-pink-200"}>
                                Ko-fi
                            </Link>
                        </motion.span>{" "}
                        is another way to donate to me. Use this for one time payments -- Ko-fi takes very low cuts of your donated money.
                    </li>
                    <li>
                        <motion.span whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}>
                            <Link href={"https://github.com/sponsors/mldchan"} className={"text-pink-400 hover:text-pink-200"}>
                                GitHub Sponsors
                            </Link>
                        </motion.span>{" "}
                        - I set this one up recently. I don&apos;t know how much GitHub cuts, but you can use this to donate to me as well.
                    </li>
                </ul>

                <Heading level={2}>Where will my money go if I donate?</Heading>
                <p>Your money will most definitely go into my pockets. No third-parties involved. Unless I pay for something online.</p>
                <p>Your money will be used for example:</p>
                <ul className={"list-disc ml-4"}>
                    <li>
                        <strong>To support servers</strong> - My servers aren&apos;t free to run -- just like any other server -- and your donation will help me in running my servers for not just only me and you, but for
                        everyone!
                    </li>
                    <li>
                        <strong>To motivate me in programming</strong> -If you are donating to me because I make good projects -- Congratulations! Your donations will help me get motivated in programming more, as I will
                        make money from my work!
                    </li>
                    <li>
                        <strong>For other things</strong> - I am not only a programmer -- so if I will see an interesting game on Steam for sale, for example, I will buy it and maybe make a video on it! And I don&apos;t
                        know... Maybe I&apos;ll spend it on HRT or something.
                    </li>
                </ul>

                <Heading level={2}>What do I host?</Heading>
                <p>For a list of what I host, I made a dedicated page for this content. You should check that out, because some of these services are partially open to the public!</p>
                <Link href={"/services"}>
                    <Button>Services</Button>
                </Link>

                <Offset amt={6} />
                <Footer visits={props.visits} route={"/donate"} />
            </Content>
        </Main>
    );
}
