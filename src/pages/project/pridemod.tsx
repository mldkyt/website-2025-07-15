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

import header from '@/images/pridemod_header.webp';
import Image from "next/image";
import Link from "next/link";
import Metadata from "@/components/Generic/Metadata";
import {motion} from "motion/react";
import Footer from "@/components/Generic/Footer";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {countVisit, getVisits} from "@/backend/visitsCounter";
import DeprecatedProject from "@/components/Generic/DeprecatedProject";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    await countVisit({route: '/project/pridemod'});
    const visits = await getVisits({route: '/project/pridemod'});

    return {
        props: {
            visits
        }
    }
}

export default function Template(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Main>
            <Metadata title={'Pride Mod'} description={'A mod for celebrating pride month in My Summer Car.'}/>
            <Header highlight={'projects'}/>
            <Content>
                <Offset amt={4}/>
                <Heading level={1}>Pride Mod</Heading>
                <DeprecatedProject message="Deprecated on 2024/07/01. No updates are provided under any circumstance." />
                <p>A mod for celebrating pride month in My Summer Car.</p>
                <Image src={header} alt="Header"/>
                <p>After many requests to put the Pride Month Mod on NexusMods, I finally did it.</p>
                <p>Pride Month Mod for My Summer Car! Current features:</p>
                <ul>
                    <li><strong>UI color changer</strong>: LGBTQ+, Transgender, Non Binary, Pansexual and custom!
                    </li>
                    <li><strong>Pride Flags:</strong> LGBTQ+ Pride Flags including Lesbian, Gay, Bisexual,
                        Transgender and
                        custom!
                    </li>
                    <li><strong>OwOifier:</strong> OwOifies all text in all mods and all places.</li>
                    <li><strong>Identity Changer:</strong> Allows you to become an enby, girl, trans masc, trans fem
                        in My
                        Summer Car!
                    </li>
                </ul>
                <p>More features coming soon! Suggest them using the guestbook and I'll implement them.</p>

                <Link href="https://git.mldchan.dev/MSCMods/PrideMod"
                      className={'text-pink-400 hover:text-pink-200'}>
                    <motion.span whileTap={{scale: 0.9}} whileHover={{scale: 1.1}}>GitLab</motion.span>
                </Link>

                <Offset amt={3}/>
                <Footer visits={props.visits}/>
            </Content>
        </Main>
    )
}
