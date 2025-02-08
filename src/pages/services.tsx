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

import Main from "@/components/Generic/Main";
import {Header} from "@/components/Generic/Header";
import Content from "@/components/Generic/Content";
import Offset from "@/components/Generic/Offset";
import Service from "@/components/Services/Service";
import Metadata from "@/components/Generic/Metadata";
import Footer from "@/components/Generic/Footer";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {countVisit, getVisits} from "@/backend/visitsCounter";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const visits = await getVisits({route: "/services"});

    return {
        props: {
            visits,
            cloudflareSiteToken: process.env['CLOUDFLARE_SITE_TOKEN']!
        },
    };
}

export default function Services(
    props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
    return (
        <Main>
            <Metadata title={"Services"} description={"mldchan's services"}/>
            <Header/>
            <Content>
                <Offset amt={4}/>
                <h1 className={"text-center text-2xl font-bold py-4"}>
                    mldchan's Services
                </h1>

                <Service
                    svcName={"Akabot: Discord bot"}
                    svcDesc={
                        "This is a Discord bot packed with features. Official instance."
                    }
                    pubInfo={"This service is publicly available for public use."}
                    links={[
                        "https://discord.com/oauth2/authorize?client_id=1172922944033411243",
                        "/project/akabot",
                    ]}
                />
                <Service
                    svcName={"Sharkey: Fediverse Software"}
                    svcDesc={"This is what mldchan uses to connect to the fediverse."}
                    pubInfo={
                        "This service is limited to Luna's friends and people who she trusts."
                    }
                    links={[
                        "https://social.mldchan.dev",
                        "https://social.mldchan.dev/@mld",
                    ]}
                />
                <Service
                    svcName={"GitLab: Code Hosting"}
                    svcDesc={
                        "Hosts source code publicly. Accounts are limited to the usage below."
                    }
                    pubInfo={
                        "This service is limited to Luna's friends and people who she trusts."
                    }
                    links={["https://git.mldchan.dev", "https://git.mldchan.dev/mld"]}
                />
                <Service
                    svcName={"Uptime Kuma: Uptime Monitoring"}
                    svcDesc={"This services allows monitoring the uptime of my services."}
                    pubInfo={"This service is publicly available for public use."}
                    links={["https://status.mldchan.dev/"]}
                />
                <Service
                    svcName={"Website"}
                    svcDesc={"Web server for this website."}
                    pubInfo={"This service is publicly available for public use."}
                    links={["https://mldchan.dev", "https://www.mldchan.dev"]}
                />
                <Service
                    svcName={"FediMeow: Meowing for for fedi"}
                    svcDesc={
                        "Sends a meow note every hour on mldchan's sharkey instance."
                    }
                    pubInfo={"This service is publicly available for public use."}
                    links={["https://social.mldchan.dev/@FediMeow"]}
                />
                <Service
                    svcName={"Fedi Streaks: Akabot Chat Streaks for the fediverse"}
                    svcDesc={
                        "This bot provides similar functionality to Akabot's Chat Streaks on fedi."
                    }
                    pubInfo={"This service is publicly available for public use."}
                    links={["https://social.mldchan.dev/@FediStreaks"]}
                />
                <Service
                    svcName={"Fedi Summary: Akabot Chat Summary for the fediverse"}
                    svcDesc={
                        "This bot provides similar functionality to Akabot's Chat Summary on fedi."
                    }
                    pubInfo={"This service is publicly available for public use."}
                    links={["https://social.mldchan.dev/@FediStreaks"]}
                />
                <Service
                    svcName={"Meilisearch"}
                    svcDesc={"Internal search engine provider. Used for Nekosearch."}
                    pubInfo={"This service is for mldchan's personal use only."}
                />
                <Service
                    svcName={"mlshortener: Link Shortener"}
                    svcDesc={"mldchan's personal link shortener."}
                    pubInfo={"This service is for mldchan's personal use only."}
                    links={["https://s.mldchan.dev/"]}
                />
                <Service
                    svcName={"Nextcloud: Personal Cloud"}
                    svcDesc={"mldchan uses this to store and share files."}
                    pubInfo={"This service is for mldchan's personal use only."}
                    links={["https://nextcloud.mldchan.dev/"]}
                />
                <Service
                    svcName={"Dockge: Server Management"}
                    svcDesc={"Allows remote managing of mldchan's server."}
                    pubInfo={"This service is for mldchan's personal use only."}
                />
                <Service
                    svcName={"Zipline"}
                    svcDesc={"ShareX server"}
                    pubInfo={"This service is for mldchan's personal use only."}
                    links={["https://i.mldchan.dev/"]}
                />
                <Service
                    svcName={"Nekoweb View Tracker"}
                    svcDesc={
                        "Open-source tracker tracking the history of page visits on Nekoweb."
                    }
                    pubInfo={"This service is for mldchan's personal use only."}
                />
                <Service
                    svcName={"Cutie Hangout Services"}
                    svcDesc={"Friends only services"}
                    pubInfo={"This service is limited to Luna's friend circle only."}
                />
                <Service
                    svcName={"QueerBot"}
                    svcDesc={"Another Discord bot for friends."}
                    pubInfo={"This service is limited to Luna's friend circle only."}
                />
                <Offset amt={6}/>
                <Footer visits={props.visits} route={'/services'} cloudflareSiteToken={props.cloudflareSiteToken}/>
            </Content>
        </Main>
    );
}
