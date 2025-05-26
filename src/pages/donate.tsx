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
import { Header } from "@/components/Generic/Header";
import Content from "@/components/Generic/Content";
import Offset from "@/components/Generic/Offset";
import Link from "next/link";
import Metadata from "@/components/Generic/Metadata";
import Button from "@/components/Generic/Button";
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

    return (
        <Main>
            <Metadata title={"Donate"} description={"Donate to Lunya to support her projects!"} />
            <Header highlight={"donate"} />
            <Content>
                <Heading level={1}>donate</Heading>
                <p>support your local transfem catgirl ♡ :3 even a small donation helps a lot and i&apos;ll do more silly things if i get paid for it :3</p>

                <details>
                    <summary className="text-pink-400 hover:text-pink-200 transition-all cursor-pointer">Past Donators</summary>
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
                </details>

                <Heading level={2}>How do I donate?</Heading>
                <p>it&apos;s easy! use one of the following methods to donate~ i would love you to use ko-fi as it sends me the full payment!</p>
                <ul className={"list-disc ml-4"}>
                    
                    <li>
                        <span>
                            <Link href={"https://ko-fi.com/mldchan"} className={"text-pink-400 hover:text-pink-200"}>
                                Ko-fi
                            </Link>
                        </span>{" "}
                        is my preferred method and I&apos;ll even respond to your message if you add one :3
                    </li>
                    <li>
                        <span>
                            <Link href={"https://liberapay.com/mldchan/donate"} className={"text-pink-400 hover:text-pink-200"}>
                                Liberapay
                            </Link>
                        </span>{" "}
                        is a good payment method for recursive payments, so use it if you want :3
                    </li>
                    <li>
                        <span>
                            <Link href={"https://github.com/sponsors/mldchan"} className={"text-pink-400 hover:text-pink-200"}>
                                GitHub Sponsors
                            </Link>
                        </span>{" "}
                        is another one, although I don&apos;t prefer it, because a lot of my work is code, it&apos;s a good idea :3
                    </li>
                </ul>

                <Heading level={2}>where am i donating?</Heading>
                <p>to your local transfem catgirl of course! but seriously, all of your donations will go to supporting me :3</p>
                <p>examples of where the money would go:</p>
                <ul className={"list-disc ml-4"}>
                    <li>
                        <strong>servers</strong> - servers aren&apos;t free, so your support will keep them alive. same goes for domains
                    </li>
                    <li>
                        <strong>motivation</strong> - if i get money for my work it will feel like i do actual work and will motivate me :3
                    </li>
                    <li>
                        <strong>other things</strong> - perhaps hrt in the future mwmrmwrmwrmwmrmrmwrmwmrwmrmwrmwmrwa :33333
                    </li>
                </ul>

                <Heading level={2}>what do i host?</Heading>
                <p>i made a page for a full list, be sure to check it out :3</p>
                <Link href={"/services"}>
                    <Button>services</Button>
                </Link>

                <Offset amt={6} />
                <Footer visits={props.visits} route={"/donate"} />
            </Content>
        </Main>
    );
}
