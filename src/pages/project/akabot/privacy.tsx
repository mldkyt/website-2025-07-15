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
import Content from "@/components/Generic/Content";
import Heading from "@/components/Generic/Heading";
import Offset from "@/components/Generic/Offset";
import Metadata from "@/components/Generic/Metadata";
import Footer from "@/components/Generic/Footer";
import {InferGetServerSidePropsType} from "next";
import {getVisits} from "@/backend/visitsCounter";
import Link from "next/link";

const PrivacyHeading = (props: { children: string }) => <h2 className={'text-xl font-bold my-4'}>{props.children}</h2>;

export async function getServerSideProps() {
    const visits = await getVisits({route: '/project/akabot/privacy'});

    return {
        props: {
            visits
        }
    }
}

export default function AkabotPrivacy(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Main>
            <Metadata title={'Akabot Privacy Policy'} description={'Akabot Discord bot privacy policy'}/>
            <Header highlight={'projects'}/>
            <Content>
                <Heading level={1}>akabot privacy policy uwu</Heading>
                <p className="py-2">last update: 2025/05/26</p>
                <p className="py-2">
                    the public instance of akabot (just like any other) saves some form of user data.
                </p>
                <PrivacyHeading>what does it store?</PrivacyHeading>
                <p className={'text-lg py-2'}>each feature stores as little information as possible:</p>
                <ul className={'list-disc ml-4 py-2'}>
                    <li className="py-1">
                        <strong>analytics</strong> - counts the amounts of runs of individual commands.
                    </li>
                    <li className="py-1">
                        <strong>anti raid</strong> - there&apos;s absolutely nothing stored in the db at all. only RAM of the server is used.
                    </li>
                    <li className="py-1">
                        <strong>automod actions</strong> - stores user defined actions.
                    </li>
                    <li className="py-1"><strong>help command</strong> - nothing is stored.</li>
                    <li className="py-1"><strong>chat revive</strong> - stores user set information and date of last message. also stores if the channel was revived or not
                    </li>
                    <li className="py-1">
                        <strong>chat streaks</strong> - stores dates of the start of the streak and last message, for every server per user.
                    </li>
                    <li className="py-1">
                        <strong>chat summary</strong> - stores counts of 
                    </li>
                    <li className="py-1">
                        <strong>feedback cmds</strong> - these store the content inputted and the user name, id of the user who submitted it.
                    </li>
                    <li className="py-1">
                        <strong>giveaways</strong> - stores information given by the user (end date and item) and stores all participants.
                    </li>
                    <li className="py-1">
                        <strong>leveling</strong> - stores the XP associated to each member in each server, and rewards per server.
                    </li>
                    <li className="py-1"><strong>logging</strong> - stores which channel is used for logging.
                    </li>
                    <li>
                        <strong>moderation</strong> - stores roles marked as moderator roles.
                    </li>
                    <li className="py-1"><strong>per user settings</strong> - user settings like language are saved.
                    </li>
                    <li>
                        <strong>reaction roles</strong> - surprisingly nothing!
                    </li>
                    <li className="py-1"><strong>roles on join</strong> - list of roles that are defined to be added on join.
                    </li>
                    <li className="py-1"><strong>server settings</strong> - whatever the user sets (language, logging channel) are stored.</li>
                    <li className="py-1"><strong>verification</strong> - verification settings are stored.</li>
                    <li className="py-1"><strong>welcome and goodbye</strong> - information related to welcoming and saying goodbye to members, such as channel, title and content are stored.
                    </li>
                </ul>
                <p className="py-2">
                    Lunya is not allowed for privacy reasons to read the database. however, she is still allowed to run queries that modify the database, granted that the query doesn&apos;t output anything
                </p>
                <PrivacyHeading>connected services</PrivacyHeading>
                <p className="py-2">there are a few services that are linked to the project:</p>
                <ul>
                    <li className="py-1">
                        <strong>GlitchTip</strong> - essentially a Sentry alternative. it is used to catch and collect all errors of the code and fix them.
                    </li>
                </ul>
                <PrivacyHeading>3rd parties</PrivacyHeading>
                <p className="py-2">the bot will send data to <Link href="https://git.lunya.pet" className={'text-pink-400 hover:text-pink-200 transition-all'}>git.lunya.pet</Link> when you submit feedback through one of the 2 commands.</p>
                <PrivacyHeading>changes to privacy statement</PrivacyHeading>
                <p className="py-2">
                    if the privacy statement changes, and the changes have actual impact, a notification will be made in the <Link href="https://discord.gg/YFksXpXnn6" className={'text-pink-400 hover:text-pink-200 transition-all'}>official support server</Link>.
                </p>
                <Offset amt={3}/>
                <Footer visits={props.visits} route={'/project/akabot/privacy'}
                        />
            </Content>
        </Main>
    )
}
