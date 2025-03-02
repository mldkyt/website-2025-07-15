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
import Page1 from "@/components/MainPage/Page1";
import Page3Projects from "@/components/MainPage/Page3Projects";
import Page4Other from "@/components/MainPage/Page4Other";
import Metadata from "@/components/Generic/Metadata";
import Footer from "@/components/Generic/Footer";
import Page2About from "@/components/MainPage/Page2About";
import {InferGetServerSidePropsType} from "next";
import {getVisits} from "@/backend/visitsCounter";

export async function getServerSideProps() {
    const visits = await getVisits({route: '/'});

    return {
        props: {
            visits,
            cloudflareSiteToken: process.env['CLOUDFLARE_SITE_TOKEN']!
        }
    }
}

export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
            <Header highlight={'home'}/>
            <Metadata title={'Home Page'} description={'mldchan\'s personal website'}/>
            <Main>
                <Page1/>
                <Page2About/>
                <Page3Projects/>
                <Page4Other/>
                <Footer visits={props.visits} route={'/'} cloudflareSiteToken={props.cloudflareSiteToken}/>
            </Main>
        </>
    );
}
