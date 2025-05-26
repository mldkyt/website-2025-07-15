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
import Generator from "@/components/CatgirlNonsense/Generator";
import Offset from "@/components/Generic/Offset";
import Metadata from "@/components/Generic/Metadata";
import Footer from "@/components/Generic/Footer";
import {InferGetServerSidePropsType} from "next";
import {getVisits} from "@/backend/visitsCounter";
import Link from "next/link";
import Button from "@/components/Generic/Button";

export async function getServerSideProps() {
    const visits = await getVisits({route: '/project/catgirlnonsense'});

    return {
        props: {
            visits
        }
    }
}

export default function CatgirlNonsense(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <Main>
        <Metadata title={'Catgirl Nonsense'} description={'Catgirl Nonsense generator'}/>
        <Header highlight={'projects'}/>
        <Content>
            <Heading level={1}>Catgirl Nonsense Generator</Heading>
            <Generator/>
            <br />
            <Link href={'/discord'}>
                <Button fullWidth>Get support in the Discord server!</Button>
            </Link>
            <Offset amt={2}/>
            <Footer visits={props.visits} route={'/project/catgirlnonsense'}
                    />
        </Content>
    </Main>
}