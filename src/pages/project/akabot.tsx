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
import Heading from "@/components/Generic/Heading";
import Link from "next/link";
import Button from "@/components/Generic/Button";
import Metadata from "@/components/Generic/Metadata";
import Footer from "@/components/Generic/Footer";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {countVisit, getVisits} from "@/backend/visitsCounter";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    await countVisit({route: '/project/akabot'});
    const visits = await getVisits({route: '/project/akabot'});

    return {
        props: {
            visits
        }
    }
}

export default function Akabot(props: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
        <Main>
            <Metadata title={'Akabot'} description={'Akabot is a Discord bot with a ton of features.'}/>
            <Header highlight={'projects'}/>
            <Content>
                <Offset amt={3}/>
                <Heading level={1}>Akabot: mldchan's Discord bot</Heading>
                <p>Akabot is a Discord bot with Chat Revive, Chat Streaks, Chat Summary, Leveling, Logging, Moderation
                    Commands, Reaction Roles, Giveaways, Verification, Reaction Roles, Suggestions, Temporary Voice
                    Channels, Welcome and Goodbye, all for free, across Japanese, French, Russian, English, Spanish,
                    Czech, Chinese Simplified, Dutch, Hindi and German. <i>(this list is exhaustive)</i></p>

                <div className={'flex flex-row flex-wrap'}>
                    <Link href={'/project/akabot/invite'}>
                        <Button>Invite Akabot in your server </Button>
                    </Link>
                    <Link href={'/donate'} className={'ml-2'}>
                        <Button>Donate to mldchan</Button>
                    </Link>
                    <Link href={'https://git.mldchan.dev/mld/Akabot'} className={'ml-2'}>
                        <Button>View the source code</Button>
                    </Link>
                </div>

                <h2 className={'text-center text-xl font-bold py-2'}>Features</h2>
                <ul className={'list-disc ml-4'}>
                    <li>
                        <strong>Languages:</strong> Japanese, French, Russian, English, Spanish, Czech, Chinese
                        Simplified,
                        Dutch, Hindi and German
                    </li>
                    <li>
                        <strong>Chat Revive</strong>: Revive your dead general chat automatically with a revive role
                        ping.
                    </li>
                    <li>
                        <strong>Chat Streaks</strong>: Track users who send a message daily and build a leaderboard of
                        users who are active.
                    </li>
                    <li>
                        <strong>Chat Summary</strong>: Count messages sent every day and find out who sends the most.
                    </li>
                    <li>
                        <strong>Leveling</strong>: Reward active users with levels and roles.
                    </li>
                    <li>
                        <strong>Logging</strong>: Log moderation actions, message edits, message deletes, and more.
                    </li>
                    <li>
                        <strong>Moderation Commands</strong>: Kick, ban, mute up to 28 days, warn
                    </li>
                    <li>
                        <strong>Automod Actions</strong>: Perform moderator actions when an automod rule gets triggered.
                    </li>
                    <li>
                        <strong>Reaction Roles</strong>: Allow users to get roles by reacting to a message.
                    </li>
                    <li>
                        <strong>Giveaways</strong>: Start giveaways, track entries, and pick winners.
                    </li>
                    <li>
                        <strong>Verification</strong>: Verify users with a captcha, reversing and English word or any
                        other method.
                    </li>
                    <li>
                        <strong>Suggestions</strong>: Allow users to suggest things for your server.
                    </li>
                    <li>
                        <strong>Temporary Voice Channels</strong>: Allow users to create temporary voice channels, which
                        get deleted when empty.
                    </li>
                    <li>
                        <strong>Welcome and Goodbye</strong>: Send welcome and goodbye messages in a channel welcoming
                        users who join your server and saying goodbye to those who leave your server.
                    </li>
                </ul>

                <Heading level={2}>How do I get this bot?</Heading>
                <p>You can use the public instance, which is free! Invite the bot using the button below.</p>
                <Link href={'/project/akabot/invite'}>
                    <Button>Invite Akabot in your server </Button>
                </Link>

                <p>The bot is open-source, so if you want to host your own instance for the public or for personal use,
                    click the button below to view the source code:</p>
                <Link href={'https://git.mldchan.dev/mld/Akabot'}>
                    <Button>View the source code</Button>
                </Link>

                <Heading level={2}>How do I donate to this project?</Heading>
                <p>If you want to donate, that would be really grateful! This bot is free for everyone and it's not easy
                    to maintain a 99% uptime. </p>
                <p>You can donate on the dedicated page for donations.</p>
                <Link href={'/donate'}>
                    <Button>Donate to mldchan</Button>
                </Link>
                <Footer visits={props.visits}/>
            </Content>
        </Main>
    )

}
