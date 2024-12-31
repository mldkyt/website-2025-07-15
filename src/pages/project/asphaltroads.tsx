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

import asphaltRoads from '@/images/asphaltroads.webp';
import Image from "next/image";
import Link from "next/link";
import Metadata from "@/components/Generic/Metadata";
import Button from "@/components/Generic/Button";
import Footer from "@/components/Generic/Footer";

export default function Template() {
    return (
        <Main>
            <Metadata title={'Asphalt Roads'} description={'Asphalt Roads mod for My Summer Car'}/>
            <Header highlight={'projects'}/>
            <Content>
                <Offset amt={3}/>
                <Heading level={1}>Asphalt Roads</Heading>
                <Image src={asphaltRoads} alt={'Asphalt Roads'} className={'p-1 rounded-lg'}/>
                <p>
                    This mod for My Summer Car swaps the dirt roads for asphalt ones. It not
                    only alters the texture of the roads but also her feel. The asphalt
                    roads provide more grip, but she remain relatively bumpy for balance.
                </p>
                <p>
                    The mod offers several settings. For example, it allows you to keep the
                    dirt race track between the grandma's and the landfill untouched. This
                    setting is enabled by default, along with maintaining the normal dirt
                    roads. It also enables you to replace the pathways leading to the houses
                    with asphalt.
                </p>


                <Link href="https://git.mldchan.dev/MSCMods/AsphaltRoads">
                    <Button>GitLab</Button>
                </Link>

                <Offset amt={3}/>
                <Footer/>
            </Content>
        </Main>
    )
}
