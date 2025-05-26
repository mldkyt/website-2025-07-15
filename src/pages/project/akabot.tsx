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
    return <div className="grid grid-cols-1 lg:grid-cols-2">
        {props.children}
    </div>
}

function Feature(props: { title: string, body: string, newFeat?: boolean }) {
    return <div className={'m-2 bg-[#181818] drop-shadow-lg rounded-lg p-3'}>
        <h3 className={'text-2xl font-bold'}>{props.title} {props.newFeat === true &&
            <span className="text-pink-500">NEW!</span>}</h3>
        <p>{props.body}</p>
    </div>
}

const features = [
    {title: 'FREE SOFTWARE BABY', description: 'GNU licensed for maximum freedom. :3'},
    {
        title: 'multilingual',
        description: 'we support 10+ languages and anyone can contribute more :3'
    },
    {title: 'chat revive', description: 'fully automated chat revive after inactivity :3'},
    {title: 'chat streaks', description: 'count consencutive days of activity in your server :3'},
    {title: 'chat summary', description: 'count daily, monthly and yearly messages into small summaries and see who is the most active daily! :3'},
    {title: 'economy', description: 'we got AkaCoins :3 you can make and trade money and items :3'},
    {title: 'leveling', description: 'get xp for chatting, levels and rewards for leveling :3'},
    {title: 'logging', description: 'log activity that might be baddd :3'},
    {title: 'message time capsule', description: 'schedule messages and collect messages to a collection message.'},
    {title: 'moderation', description: 'set up moderator roles and only let specific moderators kick, ban, warn and timeout members.'},
    {title: 'automod actions', description: 'perform actions on Automod rule triggers :3'},
    {title: 'reaction roles', description: 'let users pick roles for themselves :3'},
    {title: 'giveaways', description: 'run giveaways and automatically pick winners :3'},
    {title: 'verification', description: 'verify that members are legitimate! 3 methods of verification :3'},
    {title: 'suggestions', description: 'let members suggest content and vote on it.'},
    {title: 'temporary vc\'s', description: 'let members create as many vc\'s on demand as they want :3'},
    {title: 'welcome and goodbye', description: 'welcome new members and say goodbye to those who leave 3:'},
];

export default function Akabot(props: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
        <Main>
            <Metadata title={'Akabot'} description={'Akabot: A feature packed Discord bot that\'s free forever!'}/>
            <Header highlight={'projects'}/>
            <Content>
                <Offset amt={2}/>

                <div>
                    <h1 className={'text-center text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold'}>Akabot discord bot uwu</h1>
                    <p className={'text-center text-lg'}>akabot is a free and open source feature packed bot :3</p>
                    <br/>
                    <div className={'w-max m-auto space-x-2'}>
                        <Link href={'/project/akabot/invite'}>
                            <Button>add it</Button>
                        </Link>
                        <Link href={'https://discord.gg/YFksXpXnn6'}>
                            <Button>get support :3</Button>
                        </Link>
                    </div>
                    <p className={'text-sm text-center text-gray-500'}>the public instance has 2 fancy documents: <Link className={'text-pink-500'}
                                  href={'/project/akabot/tos'}>terms
                            of
                            service</Link> and <Link className={'text-pink-500'} href={'/project/akabot/privacy'}>privacy
                            policy</Link>.
                    </p>
                </div>

                <br />

                <Heading level={2}>features uwu</Heading>

                <FeatureList>
                    {features.map((x, i) => (<Feature key={i} title={x.title} body={x.description}/>))}
                </FeatureList>

                <br />

                <Heading level={2}>FAQ</Heading>


                <details>
                    <summary>self hosting?</summary>
                    <p>YES! the bot is open source, here it is:</p>
                    <Link href={'https://git.lunya.pet/Lunya/Akabot'} className={'m-1'}>
                        <Button>Forgejo</Button>
                    </Link>
                    <Link href={'https://github.com/LunyaPet/Akabot'} className={'m-1'}>
                        <Button>GitHub</Button>
                    </Link>

                    <p>instructions are in the repository :3</p>
                </details>

                <Heading level={2}>I love donations!</Heading>

                <p>while I try to develop and run the bot as free as possible, I would love people to donate &lt;3</p>

                <Link href={'/donate'}>
                    <Button>donate uwu</Button>
                </Link>

                <p>you can also support me non-financially, e.g. submitting your code or submitting translations on Codeberg weblate!</p>

                <Link href={'https://translate.codeberg.org/projects/akabot/'}>
                    <Button>help translate Akabot :3</Button>
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
