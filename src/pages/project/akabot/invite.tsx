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
import {motion} from "motion/react";
import Footer from "@/components/Generic/Footer";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {countVisit, getVisits} from "@/backend/visitsCounter";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const visits = await getVisits({route: '/project/akabot/invite'});

    return {
        props: {
            visits,
            cloudflareSiteToken: process.env['CLOUDFLARE_SITE_TOKEN']!
        }
    }
}

export default function InviteAkabot(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Main>
            <Metadata title={'Invite Akabot'} description={'Invite the Akabot Discord bot into your server'}/>
            <Header highlight={'projects'}/>
            <Content>
                <Offset amt={4}/>
                <Heading level={1}>Invite Akabot into your server</Heading>
                <p>Before you continue inviting Akabot into your server, the public version of Akabot has a terms of
                    service and privacy policy, and I am required to make you read these:</p>
                <ul className={'list-disc ml-4'}>
                    <li>
                        <Link href={'/project/akabot/tos'} className={'text-pink-400 hover:text-pink-200'}>
                            <motion.span whileTap={{scale: 0.9}} whileHover={{scale: 1.1}}>Terms of Service
                            </motion.span>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/project/akabot/privacy'} className={'text-pink-400 hover:text-pink-200'}>
                            <motion.span whileTap={{scale: 0.9}} whileHover={{scale: 1.1}}>Privacy Policy</motion.span>
                        </Link>
                    </li>
                </ul>

                <p>By clicking invite, I accept the Privacy Policy and Terms of Service above.</p>
                <Link href={'https://discord.com/oauth2/authorize?client_id=1172922944033411243'}>
                    <Button>Invite Akabot</Button>
                </Link>
                <Offset amt={3}/>
                <Footer visits={props.visits} route={'/project/akabot/invite'}
                        cloudflareSiteToken={props.cloudflareSiteToken}/>
            </Content>
        </Main>
    )
}
