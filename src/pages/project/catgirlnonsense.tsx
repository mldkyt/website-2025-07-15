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
import Heading from "@/components/Generic/Heading";
import Generator from "@/components/CatgirlNonsense/Generator";
import Offset from "@/components/Generic/Offset";
import Metadata from "@/components/Generic/Metadata";
import Footer from "@/components/Generic/Footer";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {countVisit, getVisits} from "@/backend/visitsCounter";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    await countVisit({route: '/project/catgirlnonsense'});
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
            <Offset amt={3}/>
            <Heading level={1}>Catgirl Nonsense Generator</Heading>
            <Generator/>
            <Offset amt={3}/>
            <Footer visits={props.visits}/>
        </Content>
    </Main>
}