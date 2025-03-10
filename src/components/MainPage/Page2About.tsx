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

import Content from "@/components/Generic/Content";
import Heading from "@/components/Generic/Heading";
import Link from "next/link";

export default function Page2About() {
  return (
    <div className={"h-screen"}>
      <Content>
        <Heading level={1}>Who is mldchan?</Heading>
        <p className={"my-4"}>
          mldchan is a programmer. They is a cute little
          transgirl who also happens to be a catgirl.
        </p>
        <p className={"my-4"}>
          They know lots of things, like programming languages, editing videos
          or drawing a bit of art. They are considered smart by themself and their close
          relatives.
        </p>
        <p className={"my-4"}>
          They write in a lot of programming languages, namely Python,
          TypeScript, Lua, C#, C++, Rust, PHP, Java and more. Their most popular
          project is Akabot, a general purpose Discord bot. They also did some My
          Summer Car mods, most of which are private because of the{" "}
          <Link
            href={"https://social.mldchan.dev/notes/a1tsf5xe9kiu00r2"}
            className={"text-pink-400 hover:text-pink-200"}
          >
            community&apos;s backlash
          </Link>
          .
        </p>
        <p className={"my-4"}>
          Another thing They&apos;s known for is their content creation career on
          YouTube. They started making My Summer Car content, then making more
          than just that, to mostly moving away from My Summer Car and posting
          other videos.
        </p>
      </Content>
    </div>
  );
}
