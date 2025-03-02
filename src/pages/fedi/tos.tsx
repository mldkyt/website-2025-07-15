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
import Content from "@/components/Generic/Content";
import Heading from "@/components/Generic/Heading";
import Offset from "@/components/Generic/Offset";
import Metadata from "@/components/Generic/Metadata";
import Footer from "@/components/Generic/Footer";
import {InferGetServerSidePropsType} from "next";
import {getVisits} from "@/backend/visitsCounter";

export async function getServerSideProps() {
    const visits = await getVisits({route: "/fedi/tos"});

    return {
        props: {
            visits,
            cloudflareSiteToken: process.env['CLOUDFLARE_SITE_TOKEN']!
        },
    };
}

export default function TermsofService(
    props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
    return (
        <Main>
            <Metadata
                title={"Fedi Terms of Service"}
                description={"mldchan Social Terms of Service"}
            />
            <Header/>
            <Content>
                <Offset amt={4}/>
                <Heading level={1}>Fedi Terms of Service</Heading>
                <p>
                    <em>Last Updated: December 17, 2024</em>
                </p>

                <div>
                    <Heading level={2}>Instance Overview</Heading>
                    <p>
                        This is an instance hosted by mldchan for themself and their friends.
                        Joining is by invitation only.
                    </p>
                </div>

                <div>
                    <Heading level={2}>Membership Rules</Heading>
                    <ol className={"list-decimal ml-4"}>
                        <li>
                            This instance is primarily intended for friends of mldchan or those
                            invited by friends.
                        </li>
                        <li>Users must be a &quot;cutie&quot; to join and participate.</li>
                        <li>
                            Absolutely no tolerance for:
                            <ul className={"ml-4 list-disc"}>
                                <li>Racism</li>
                                <li>Fascism</li>
                                <li>Nazism</li>
                                <li>Queerphobia</li>
                                <li>Xenophobia</li>
                                <li>Similar discriminatory ideologies</li>
                            </ul>
                        </li>
                        <li>
                            Account approval is at the discretion of mldchan:
                            <ul className={"ml-4 list-disc"}>
                                <li>Friends of mldchan require direct invitation</li>
                                <li>
                                    If someone is searching for an instance, and I know them for
                                    an extended period of time, I can invite them
                                </li>
                            </ul>
                        </li>
                        <li>
                            <strong>NO POLITICS</strong>
                            <ul className={"ml-4 list-disc"}>
                                <li>Zero tolerance for political discussions</li>
                                <li>Political jokes or references are strictly prohibited</li>
                            </ul>
                        </li>
                        <li>
                            No harassment of members on this instance or other instances.
                        </li>
                        <li>
                            Respect is mandatory:
                            <ul className={"ml-4 list-disc"}>
                                <li>No offensive or derogatory memes</li>
                                <li>
                                    No offensive or derogatory content targeting:
                                    <ul className={"ml-4 list-disc"}>
                                        <li>Fictional figures</li>
                                        <li>Countries</li>
                                        <li>Religions</li>
                                        <li>Races</li>
                                        <li>Sexual orientations</li>
                                        <li>Gender identities</li>
                                        <li>Any potential vulnerability</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            No spamming:
                            <ul className={"ml-4 list-disc"}>
                                <li>No spam notes</li>
                                <li>No spam mentions</li>
                                <li>No spam attachments</li>
                            </ul>
                        </li>
                        <li>
                            Content Guidelines for Mature Content:
                            <ul className={"ml-4 list-disc"}>
                                <li>
                                    NSFW/Lewd content must be:
                                    <ul className={"ml-4 list-disc"}>
                                        <li>Either appropriately tagged;</li>
                                        <li>Or hidden behind content warnings</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ol>
                </div>

                <div>
                    <Heading level={2}>Basic Precautions</Heading>
                    <p>
                        <strong>Data Persistence</strong> - In a decentralized system,
                        deleted content may remain on other servers
                    </p>
                    <p>
                        <strong>Privacy Concerns</strong> - Private posts are not guaranteed
                        to remain private across all servers
                    </p>
                    <p>
                        <strong>Drive Feature</strong> - NOT a secure cloud storage.
                        Uploaded files are available publicly.
                    </p>
                </div>

                <div>
                    <Heading level={2}>Contact</Heading>
                    <p>
                        For questions or clarifications about these terms, contact{" "}
                        <a href="mailto:mldkyt@proton.me">mldkyt@proton.me</a>.
                    </p>
                </div>

                <p>
                    <small>
                        Parts of this page were AI generated. The content has been checked
                        by an actual person.
                    </small>
                </p>
                <Offset amt={4}/>
                <Footer visits={props.visits} route={'/fedi/tos'} cloudflareSiteToken={props.cloudflareSiteToken}/>
            </Content>
        </Main>
    );
}
