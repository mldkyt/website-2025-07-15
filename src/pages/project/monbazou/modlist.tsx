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
import { Header } from "@/components/Generic/Header";
import Content from "@/components/Generic/Content";
import Offset from "@/components/Generic/Offset";
import Heading from "@/components/Generic/Heading";
import Link from "next/link";
import Footer from "@/components/Generic/Footer";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { countVisit, getVisits } from "@/backend/visitsCounter";
import Button from "@/components/Generic/Button";
import Metadata from "@/components/Generic/Metadata";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    await countVisit({ route: '/project/monbazou/modlist' });
    const visits = await getVisits({ route: '/project/monbazou/modlist' });

    return {
        props: {
            visits
        }
    }
}

export default function MonBazouModList(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Main>
            <Metadata title="Mon Bazou Mod List" description="Mon Bazou Mod List adds a mod list in the main menu of the game." />
            <Header highlight={'projects'} />
            <Content>
                <Offset amt={4} />
                <Heading level={1}>Mon Bazou Mod List</Heading>

                <p>Features:</p>
                <ul>
                    <li><strong>List of Mods</strong>: A convenient list of mods that allows you to change the settings of mods.</li>
                    <li><strong>Console</strong>: You'll be able to access the console directly within the game.</li>
                    <li><strong>Languages</strong>: This mod features English, Japanese, Spanish, French, Russian, Chinese, Hungarian, German and Czech translations!</li>
                </ul>

                <Link href="https://www.nexusmods.com/monbazou/mods/288">
                    <Button>Download from NexusMods</Button>
                </Link>
                <br />
                <Link href="https://git.mldchan.dev/mld/monbazoumodlist">
                    <Button>Download the source code</Button>
                </Link>

                <Offset amt={3} />
                <Footer visits={props.visits} />
            </Content>
        </Main>
    )
}
