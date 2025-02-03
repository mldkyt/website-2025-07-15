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
import MainPageProject from "@/components/MainPage/MainPageProject";

import akabot from "@/images/akabot.png";
import astolfoIsComingForYou from "@/images/astolfoiscomingforyou/safe_1.png";
import astolfOS from "@/images/astolfos/desktop.png";
import astolfoMod from "@/images/astolfomod/biome.png";
import catgirlNonsense from "@/images/catgirlnonsense.png";
import nekosearch from "@/images/search.png";
import Link from "next/link";
import { motion } from "motion/react";

export default function Page3Projects() {
  return (
    <div className={"h-screen"}>
      <Content>
        <h1 className={"py-4 text-center text-2xl font-bold"}>
          Explore Luna's projects :3
        </h1>
        <div className={"grid grid-rows-2 grid-cols-3 gap-4"}>
          <MainPageProject
            title={"Akabot"}
            body={"Akabot is a Discord bot with lots of features."}
            image={akabot}
            imgAlt={"Akabot pfp"}
            className={""}
            link={"/project/akabot"}
          />
          <MainPageProject
            title={"Astolfo is coming for you"}
            body={
              "Astolfo comes for you, with friendly and unfriendly variants."
            }
            image={astolfoIsComingForYou}
            imgAlt={"A window showing that Astolfo is a few km away from you"}
            className={""}
            link={"/project/astolfoiscomingforyou"}
          />
          <MainPageProject
            title={"AstolfOS"}
            body={"An operating system with Astolfo."}
            image={astolfOS}
            imgAlt={"AstolfOS on desktop"}
            className={""}
            link={"/project/astolfos"}
          />
          <MainPageProject
            title={"Astolfo Mod"}
            body={
              "A Minecraft mod that adds many non-binary, transgender and femboy characters to the game."
            }
            image={astolfoMod}
            imgAlt={"Astolfo biome, showing a lot of femboys"}
            className={""}
            link={"/project/astolfomod"}
          />
          <MainPageProject
            title={"Catgirl Nonsense"}
            body={"Catgirl nonsense generator."}
            image={catgirlNonsense}
            imgAlt={"Catgirl nonsense"}
            className={""}
            link={"/project/catgirlnonsense"}
          />
          <MainPageProject
            title={"Nekosearch v2"}
            body={
              "An enchanced version of Nekosearch v1. Way more accurate than before."
            }
            image={nekosearch}
            imgAlt={"Nekosearch prompt"}
            className={""}
            link={"/project/neko/search2"}
          />

          <motion.div
            className={"col-span-3"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href={"/projects"}>
              <button
                className={"w-full bg-[#222] p-2 rounded-lg drop-shadow-md"}
              >
                Show a full list of projects
              </button>
            </Link>
          </motion.div>
        </div>
      </Content>
    </div>
  );
}
