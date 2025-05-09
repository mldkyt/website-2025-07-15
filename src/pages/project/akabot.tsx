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
            visits
        }
    }
}

function FeatureList(props: { children: ReactNode }) {
    return <div>
        {props.children}
    </div>
}

function Feature(props: { title: string, body: string, newFeat?: boolean }) {
    return <div className={'m-3 bg-[#181818] drop-shadow-lg rounded-lg p-3'}>
        <h3 className={'text-2xl font-bold'}>{props.title} {props.newFeat === true &&
            <span className="text-pink-500">NEW!</span>}</h3>
        <p>{props.body}</p>
    </div>
}

const features = [
    {title: 'Free Forever', description: 'Akabot is open-source and completely free forever.'},
    {
        title: 'Multilingual',
        description: 'Supports 10+ languages including Japanese, French, Russian, English, Spanish, Czech, Chinese, Dutch, Hindi, and German.'
    },
    {title: 'Chat Revive', description: 'Automatically ping inactive channels to keep conversations alive.'},
    {title: 'Chat Streaks', description: 'Build a leaderboard of users who stay active daily.'},
    {title: 'Chat Summary', description: 'Track daily message activity and top message senders.'},
    {title: 'Economy (New!)', description: 'Manage virtual currencies within your server.'},
    {title: 'Leveling', description: 'Reward active users with levels and roles.'},
    {title: 'Logging', description: 'Log moderation actions, message edits, and deletes.'},
    {title: 'Message Time Capsule (New!)', description: 'Schedule messages, reminders, and collection messages.'},
    {title: 'Moderation', description: 'Kick, ban, mute, and warn members with ease.'},
    {title: 'Automod Actions', description: 'Automatically take action on rule violations.'},
    {title: 'Reaction Roles', description: 'Let users assign roles by reacting to messages.'},
    {title: 'Giveaways', description: 'Run giveaways, track entries, and pick winners.'},
    {title: 'Verification', description: 'Verify new users with customizable methods.'},
    {title: 'Suggestions', description: 'Collect user feedback easily.'},
    {title: 'Temporary VCs', description: 'Create and remove voice channels on demand.'},
    {title: 'Welcome and Goodbye', description: 'Welcome new users and say goodbye to those who leave.'},
];

export default function Akabot(props: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
        <Main>
            <Metadata title={'Akabot'} description={'Akabot: A feature packed Discord bot that\'s free forever!'}/>
            <Header highlight={'projects'}/>
            <Content>
                <Offset amt={8}/>

                <div>
                    <h1 className={'text-center text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold'}>Supercharge
                        Your Discord Server with Akabot!</h1>
                    <p className={'text-center text-lg'}>Akabot is a free, open-source bot packed with powerful features to enhance your community.</p>
                    <br/>
                    <div className={'w-max m-auto space-x-2'}>
                        <Link href={'/project/akabot/invite'}>
                            <Button>Invite Akabot</Button>
                        </Link>
                        <Link href={'https://discord.gg/YFksXpXnn6'}>
                            <Button>Join Support Server</Button>
                        </Link>
                    </div>
                    <p className={'text-sm text-center text-gray-500'}>By inviting the public instance, you agree to
                        the <Link className={'text-pink-500'}
                                  href={'/project/akabot/tos'}>terms
                            of
                            service</Link> and <Link className={'text-pink-500'} href={'/project/akabot/privacy'}>privacy
                            policy</Link>.
                    </p>
                </div>

                <br />

                <Heading level={2}>Features</Heading>

                <FeatureList>
                    {features.map((x, i) => (<Feature key={i} title={x.title} body={x.description}/>))}
                </FeatureList>

                <Offset amt={2}/>

                <Heading level={2}>How do I self-host this bot?</Heading>


                <p>The bot is open-source, so if you want to host your own instance for the public or for personal use,
                    click the button below to view the source code:</p>
                <Link href={'https://code.mldchan.dev/mld/Akabot'} className={'m-1'}>
                    <Button>View on Forgejo</Button>
                </Link>
                <Link href={'https://github.com/uwugrl/Akabot'} className={'m-1'}>
                    <Button>View on GitHub</Button>
                </Link>

                <p>Self-hosting instructions are available in the repository.</p>

                <Heading level={2}>Donations are welcome!</Heading>

                <p>The bot is not free to run, as any of my services, so donations are welcome!</p>

                <Link href={'/donate'}>
                    <Button>Donate</Button>
                </Link>

                <p>If you don&apos;t have money to donate, you can help translating the bot into other languages on
                    Crowdin!</p>

                <Link href={'https://translate.codeberg.org/projects/akabot/'}>
                    <Button>Help with translating!</Button>
                </Link>

                <Offset amt={2} />

                <a href="https://www.producthunt.com/posts/akabot-discord-bot?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-akabot&#0045;discord&#0045;bot"
                   target="_blank" rel="noreferrer"><img
                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=952281&theme=dark&t=1744381366274"
                    alt="Akabot&#0032;Discord&#0032;Bot - Akabot | Product Hunt" style={{
                    height: '54px',
                    width: '250px'
                }} width="250" height="54"/></a>

                <Offset amt={4}/>

                <Footer visits={props.visits} route={'/project/akabot'} />
            </Content>
        </Main>
    )

}
