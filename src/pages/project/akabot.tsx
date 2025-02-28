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
import Offset from "@/components/Generic/Offset";
import Heading from "@/components/Generic/Heading";
import Link from "next/link";
import Button from "@/components/Generic/Button";
import Metadata from "@/components/Generic/Metadata";
import Footer from "@/components/Generic/Footer";
import {InferGetServerSidePropsType} from "next";
import {getVisits} from "@/backend/visitsCounter";
import {ReactNode} from "react";

export async function getServerSideProps() {
    const visits = await getVisits({route: '/project/akabot'});

    return {
        props: {
            visits,
            cloudflareSiteToken: process.env['CLOUDFLARE_SITE_TOKEN']!
        }
    }
}

function FeatureList(props: { children: ReactNode }) {
    return <div className={'grid grid-cols-2'}>
        {props.children}
    </div>
}

function Feature(props: { title: string, body: string }) {
    return <div className={'m-1 bg-[#222] drop-shadow-lg rounded-lg p-2 py-1'}>
        <h3 className={'text-xl font-bold'}>{props.title}</h3>
        <p>{props.body}</p>
    </div>
}

export default function Akabot(props: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
        <Main>
            <Metadata title={'Akabot'} description={'Akabot: A feature packed Discord bot that\'s free forever!'}/>
            <Header highlight={'projects'}/>
            <Content>
                <Offset amt={8}/>

                <div>
                    <h1 className={'text-center text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold'}>Akabot: A
                        feature packed
                        Discord bot that&apos;s free forever!</h1>
                    <br/>
                    <div className={'w-max m-auto'}>
                        <Link href={'/project/akabot/invite'}>
                            <Button>Invite Akabot in your server</Button>
                        </Link>
                    </div>
                    <p className={'text-sm text-center text-gray-500'}>By inviting the public instance, you agree to
                        the <Link className={'text-pink-500'}
                                  href={'/project/akabot/tos'}>terms
                            of
                            service</Link> and <Link className={'text-pink-500'} href={'/project/akabot/privacy'}>privacy
                            policy</Link>.
                    </p>
                    <p className="text-sm text-center text-gray-500">
                        You can join the <Link href="https://discord.gg/YFksXpXnn6" className="text-pink-500">Support Discord server</Link>.
                    </p>
                </div>

                <Offset amt={5}/>
                <p className={'text-center'}>Akabot is a fully functional feature packed Discord bot that&apos;s free
                    forever!</p>

                <Heading level={2}>Features</Heading>

                <FeatureList>
                    <Feature title={'Free Forever'} body={'The bot is open-source and free forever!'}/>
                    <Feature title={'Multilingual'}
                             body={'Japanese, French, Russian, English, Spanish, Czech, Chinese Simplified, Dutch, Hindi and German'}/>
                    <Feature title={'Chat Revive'}
                             body={'Revive your dead general chat automatically with a revive role ping.'}/>
                    <Feature title={'Chat Streaks'}
                             body={'Track users who send a message daily and build a leaderboard of users who are active.'}/>
                    <Feature title={'Chat Summary'}
                             body={'Count messages sent every day and find out who sends the most.'}/>
                    <Feature title={'Leveling'} body={'Reward active users with levels and roles.'}/>
                    <Feature title={'Logging'}
                             body={'Log moderation actions, message edits, message deletes, and more.'}/>
                    <Feature title={'Moderation'} body={'Kick, ban, mute up to 28 days, warn'}/>
                    <Feature title={'Automod Actions'}
                             body={'Perform moderator actions when an automod rule gets triggered.'}/>
                    <Feature title={'Reaction Roles'} body={'Allow users to get roles by reacting to a message.'}/>
                    <Feature title={'Giveaways'} body={'Start giveaways, track entries, and pick winners.'}/>
                    <Feature title={'Verification'}
                             body={'Verify users with a captcha, reversing and English word or any other method.'}/>
                    <Feature title={'Suggestions'} body={'Allow users to suggest things for your server.'}/>
                    <Feature title={'Temporary VCs'}
                             body={'Allow users to create temporary voice channels, which get deleted when empty.'}/>
                    <Feature title={'Welcome and Goodbye'}
                             body={'Send welcome and goodbye messages in a channel welcoming users who join your server and saying goodbye to those who leave your server.'}/>
                </FeatureList>

                <Offset amt={2}/>

                <Heading level={2}>How do I self-host this bot?</Heading>


                <p>The bot is open-source, so if you want to host your own instance for the public or for personal use,
                    click the button below to view the source code:</p>
                <Link href={'https://code.mldchan.dev/mld/Akabot'} className={'m-1'}>
                    <Button>View the source code on mldchan&apos;s self-hosted Forgejo</Button>
                </Link>
                <Link href={'https://github.com/uwugrl/Akabot'} className={'m-1'}>
                    <Button>View the source code on GitHub</Button>
                </Link>

                <p>Self-hosting instructions are available in the repository.</p>

                <Heading level={2}>Donations are welcome!</Heading>

                <p>The bot is not free, as any of my services, so donations are welcome!</p>

                <Link href={'/donate'}>
                    <Button>Donate to mldchan</Button>
                </Link>

                <p>If you don&apos;t have money to donate, you can help translating the bot into other languages on
                    Crowdin!</p>

                <Link href={'https://crowdin.com/project/akabot-by-akatsuki2555'}>
                    <Button>Help with translating!</Button>
                </Link>

                <Offset amt={4}/>

                <Footer visits={props.visits} route={'/project/akabot'}
                        cloudflareSiteToken={props.cloudflareSiteToken}/>
            </Content>
        </Main>
    )

}
