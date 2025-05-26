/*
 *     Lunya's Personal Website
 *     Copyright (C) 2024  Lunya UwU :3
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
import Service from "@/components/Services/Service";
import Metadata from "@/components/Generic/Metadata";
import Footer from "@/components/Generic/Footer";
import { InferGetServerSidePropsType } from "next";
import { getVisits } from "@/backend/visitsCounter";

export async function getServerSideProps() {
    const visits = await getVisits({ route: "/services" });

    return {
        props: {
            visits,
        },
    };
}

export default function Services(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Main>
            <Metadata title={"Services"} description={"Lunya's services"} />
            <Header highlight="services" />
            <Content>
                <h1 className={"text-center text-3xl font-bold py-4"}>Lunya&apos;s Services</h1>

                <h2 className="text-xl font-bold">Public services</h2>
                <p>Anyone can interact with these in some way!</p>

                <Service
                    svcName={"Akabot: Discord bot"}
                    svcDesc={"This is a Discord bot packed with features. Official instance."}
                    links={[{
                        label: "Add the bot on Discord!",
                        url: "https://discord.com/oauth2/authorize?client_id=1172922944033411243"
                    }, {
                        label: "View project page",
                        url: "/project/akabot"
                    }]}
                />
                <Service
                    svcName={"Lunyakey: Fediverse Software"}
                    svcDesc={"This is what Lunya uses to connect to the fediverse. Lunyakey is the cutest fork of Sharkey. "}
                    links={[{
                        label: "Open Sharkey",
                        url: "https://fedi.lunya.pet"
                    }, {
                        label: "View my profile",
                        url: "https://fedi.lunya.pet/@Lunya"
                    }]}
                />
                <Service
                    svcName={"PeerTube: Federated P2P Video Sharing"}
                    svcDesc={"Any recent videos are posted here alongside YouTube."}
                    links={[{
                        label: "Open Peertube",
                        url: "https://peertube.mldchan.dev"
                    }, {
                        label: "View my channels",
                        url: "https://peertube.mldchan.dev/a/mld/video-channels"
                    }, {
                        label: "View my main videos",
                        url: "https://peertube.mldchan.dev/c/mldchan/videos"
                    }, {
                        label: "View my TikTok re-uploads",
                        url: "https://peertube.mldchan.dev/c/mldtiktok/videos"
                    }]}
                />
                <Service
                    svcName={"Forgejo: Code Hosting"}
                    svcDesc={"Hosts source code publicly. Accounts are public for forking and development reasons until federation gets added."}
                    links={[{
                        label: "Open Forgejo",
                        url: "https://git.lunya.pet"
                    }, {
                        label: "Open my profile on Forgejo",
                        url: "https://git.lunya.pet/Lunya"
                    }]}
                />
                <Service svcName={"Website"} svcDesc={"Web server for this website."} links={[{
                    label: "Home page",
                    url: "https://lunya.pet"
                }]} />
                <Service
                    svcName={"FediMeow: Meowing for for fedi"}
                    svcDesc={"Sends a meow note every hour on mldchan's sharkey instance."}
                    links={[{
                        label: "Fediverse profile for the official account",
                        url: "https://fedi.lunya.pet/@FediMeow"
                    }]}
                />
                <Service
                    svcName={"Fedi Streaks: Akabot Chat Streaks for the fediverse"}
                    svcDesc={"This bot provides similar functionality to Akabot's Chat Streaks on fedi."}
                    links={[{
                        label: "Fediverse profile for the official account",
                        url: "https://fedi.lunya.pet/@FediStreaks"
                    }]}
                />
                <Service
                    svcName={"Fedi Summary: Akabot Chat Summary for the fediverse"}
                    svcDesc={"This bot provides similar functionality to Akabot's Chat Summary on fedi."}
                    links={[{
                        label: "Fediverse profile for the official account",
                        url: "https://fedi.lunya.pet/@FediSummary"
                    }]}
                />

                <h2 className="text-xl font-bold">Private services</h2>

                <Service
                    svcName={"Nextcloud: Personal Cloud"}
                    svcDesc={"Lunya uses this to mostly store and sometimes share files."}
                    links={[{
                        label: "Open Nextcloud",
                        url: "https://nextcloud.mldchan.dev/"
                    }]}
                />
                <Service svcName={"uptime-kuma: Status monitor"} svcDesc={"Allows me to receive notifications when something doesn't work right."} />
                <Service svcName={"Dockge: Server Management"} svcDesc={"Allows remote managing of Lunya's server."} />
                <Service svcName={"Nekoweb View Tracker"} svcDesc={"Open-source tracker tracking the history of page visits on Nekoweb."} />
                <Service svcName={"Cutie Hangout Services"} svcDesc={"Friends only services"} />
                <Service svcName={"QueerBot"} svcDesc={"Another Discord bot for friends."} />
                
                <Offset amt={6} />
                <Footer visits={props.visits} route={"/services"} />
            </Content>
        </Main>
    );
}
