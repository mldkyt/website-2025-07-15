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
import Content from "@/components/Generic/Content";
import Offset from "@/components/Generic/Offset";
import { Header } from "@/components/Generic/Header";
import Social from "@/components/Socials/Social";
import Metadata from "@/components/Generic/Metadata";
import Footer from "@/components/Generic/Footer";
import { InferGetServerSidePropsType } from "next";
import { getVisits } from "@/backend/visitsCounter";

export async function getServerSideProps() {
    const visits = await getVisits({ route: "/socials" });

    return {
        props: {
            visits,
        },
    };
}

export default function Socials(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Main>
            <Metadata title={"Socials"} description={"mldchan's socials"} />
            <Header highlight={"socials"} />
            <Content>
                <Offset amt={4} />
                <h1 className={"text-center text-2xl font-bold py-4"}>Luna&apos;s Socials :3</h1>
                <Social social={"Fediverse"} socialDescription={"A decentralized social platform"} preSocial={"the"} followAction={"follow"} link={"https://social.mldchan.dev/@mld"} />
                <Social social={"PeerTube"} socialDescription={"Federated P2P Video Sharing"} followAction={"subscribe to"} link={"https://peertube.mldchan.dev/c/mldchan"} />
                <Social social={"YouTube"} socialDescription={"Video content creation platform"} followAction={"subscribe to"} link={"https://youtube.com/@mldchan"} />
                <Social social={"Instagram"} socialDescription={"Photo and video sharing platform"} followAction={"follow"} link={"https://instagram.com/_mldchan_"} />
                <Social social={"Twitch"} socialDescription={"Streaming platform"} followAction={"follow"} link={"https:///twitch.tv/mldchan"} />
                <Social social={"Personal Forgejo instance"} socialDescription={"Code Sharing"} followAction={"view"} link={"https://code.mldchan.dev/mld"} />
                <Social social={"GitHub"} socialDescription={"Code Sharing"} followAction={"follow"} link={"https://github.com/uwugrl"} />
                <Social social={"Codeberg"} socialDescription={"Code Sharing"} followAction={"follow"} link={"https://codeberg.org/mldchan"} />
                <Social social={"Steam"} socialDescription={"Gaming platform"} followAction={"view"} link={"https://steamcommunity.com/id/mldchan/"} /> 
                <Offset amt={6} />
                <Footer visits={props.visits} route={"/socials"} />
            </Content>
        </Main>
    );
}
