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
import Footer from "@/components/Generic/Footer";
import {InferGetServerSidePropsType} from "next";
import {getVisits} from "@/backend/visitsCounter";
import Disclaimer from "@/components/Generic/Disclaimer";
import Button from "@/components/Generic/Button";
import Metadata from "@/components/Generic/Metadata";

export async function getServerSideProps() {
    const visits = await getVisits({route: '/project/monbazou/wintermod'});

    return {
        props: {
            visits
        }
    }
}

export default function WinterMod(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Main>
            <Metadata title="Mon Bazou Winter Mod"
                      description="The Mon Bazou Winter Mod changes the Mon Bazou game to take place in winter."/>
            <Header highlight={'projects'}/>
            <Content>
                <Offset amt={4}/>
                <Heading level={1}>Winter Mod for Mon Bazou</Heading>

                <Disclaimer title="Work in Progress"
                            message="This mod is very early in development. Beta versions are available for download, but note they aren't finished and the final project might change."/>

                <p className="my-2">The Mon Bazou Winter Mod changes the game&apos;s textures to be in a winter style.</p>

                <ul className="list-disc ml-6">
                    <li><strong>Winter Textures</strong>: Replaces all textures with winter ones.</li>
                    <li><strong>Winter Roads</strong>: Roads are winter textured. (they&apos;ll behave like that in the next
                        updates)
                    </li>
                    <li><strong>Temperature Stat</strong>: A new stat for the player that increases as the player works
                        outside. They can now freeze to death. (Not finished)
                    </li>
                    <li><strong>More!</strong>: Suggestions are welcome. Suggest the changes inside the Mon Bazou
                        Modding server, by either pinging me or finding the respective forum post for it in the
                        mod-ideas formums.
                    </li>
                </ul>

                <Link href="https://github.com/uwugrl/MonBazouWinterMod/releases">
                    <Button>Download latest release from GitHub</Button>
                </Link>
                <br/>
                <Link href="https://code.mldchan.dev/mld/MonBazouWinterMod">
                    <Button>Download source code</Button>
                </Link>

                <Offset amt={3}/>
                <Footer visits={props.visits} route={'/project/monbazou/wintermod'}
                        />
            </Content>
        </Main>
    )
}
