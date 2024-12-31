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

import Content from "@/components/Generic/Content";
import Heading from "@/components/Generic/Heading";
import Link from "next/link";

export default function Page2About() {
    return <div className={'h-screen'}>
        <Content>
            <Heading level={1}>Who is mldchan?</Heading>
            <p>mldchan is a transfem developer on the internet. She is a cute little transgirl who also happens to be a
                catgirl.</p>
            <p>She knows lots of things, like programming languages, editing videos or drawing a bit of art. She is
                considered smart by her close relatives.</p>
            <p>She writes in a lot of programming languages, namely Python, TypeScript, Lua, C#, C++, Rust, PHP, Java
                and more. Her most popular project is Akabot, a general purpose Discord bot. She also did some My Summer
                Car mods, most of which are private because of the{" "}
                <Link href={'https://social.mldchan.dev/notes/a1tsf5xe9kiu00r2'}
                      className={'text-pink-400 hover:text-pink-200'}>community's backlash</Link>.
            </p>
            <p>Another thing she's known for is her content creation career on YouTube. She started making My Summer Car
                content, then making more than just that, to mostly moving away from My Summer Car and posting other
                videos.</p>
        </Content>
    </div>
}
