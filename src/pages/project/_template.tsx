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
import Footer from "@/components/Generic/Footer";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {countVisit, getVisits} from "@/backend/visitsCounter";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const visits = await getVisits({route: '_TEMPLATE'});

    return {
        props: {
            visits,
            cloudflareSiteToken: process.env['CLOUDFLARE_SITE_TOKEN']!
        }
    }
}

export default function Template(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Main>
            <Header highlight={'projects'}/>
            <Content>
                <Offset amt={4}/>
                <Heading level={1}>PROJECT</Heading>

                <Link href="LINK 1" className={'text-pink-400 hover:text-pink-200'}>
                    <button>LINK 1</button>
                </Link>
                <br/>
                <Link href="SOURCE LINK"
                      className={'text-pink-400 hover:text-pink-200'}>
                    <button>SOURCE</button>
                </Link>

                <Offset amt={3}/>
                <Footer visits={props.visits} route={'_TEMPLATE'} cloudflareSiteToken={props.cloudflareSiteToken}/>
            </Content>
        </Main>
    )
}
