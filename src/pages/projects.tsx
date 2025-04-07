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
import { Header } from "@/components/Generic/Header";
import Main from "@/components/Generic/Main";
import Offset from "@/components/Generic/Offset";
import Project from "@/components/Projects/Project";

import akabot from "@/images/akabot.png";
import astolfoIsComingForYou from "@/images/astolfoiscomingforyou/safe_1.png";
import astolfOS from "@/images/astolfos/desktop.png";
import astolfoMod from "@/images/astolfomod/biome.png";
import astolforp from "@/images/astolforp/menu.png";
import catgirlNonsense from "@/images/catgirlnonsense.png";
import mcFuck from "@/images/mcfuck.png";
import nexusmodsFirefox from "@/images/nexusmodsfirefox.png";
import uwurandomRs from "@/images/uwurandomrs.png";
import birthday from "@/images/birthday/main.png";
import search from "@/images/search.png";

import fediMeow from "@/images/fedimeow.png";
import fediSummarizer from "@/images/fedi/summarizer/main.png";
import fediStreaks from "@/images/fedistreaks.png";

import monbazoumodlist from "@/images/monbazoumodlist.png";
import monbazouwintermod from "@/images/monbazouwintermod.webp";

import regPlateChanger from "@/images/regplatechanger.webp";
import highwayCarBreakdowns from "@/images/highwaycarbreakdowns/1.webp";
import asphaltRoads from "@/images/asphaltroads.webp";
import mscTweaks from "@/images/msctweaks.webp";
import prideMod from "@/images/pridemod_header.webp";

import cutieQuiz from "@/images/cutiequiz/1.png";
import Metadata from "@/components/Generic/Metadata";
import Footer from "@/components/Generic/Footer";
import { InferGetServerSidePropsType } from "next";
import { getVisits } from "@/backend/visitsCounter";

export async function getServerSideProps() {
    const visits = await getVisits({ route: "/projects" });

    return {
        props: {
            visits,
        },
    };
}

export default function Projects(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Main>
            <Metadata title={"Projects"} description={"A list of projects by mldchan."} />
            <Header highlight={"projects"} />
            <Content>
                <Offset amt={4} />
                <h1 className={"text-center text-2xl font-bold py-4"}>Luna&apos;s Projects :3</h1>
                <Project image={akabot} imageAlt={"Akabot profile picture"} title={"Akabot"} description={"A Discord bot with lots of features."} link={"/project/akabot"} />
                <Project title={"GirlSocial"} description={"An open-source chatting platform focused on inclusivity."} link={"/project/girlsocial"} />
                <Project
                    image={astolfoIsComingForYou}
                    imageAlt={"Astolfo is coming for you window"}
                    title={"Astolfo is coming for you"}
                    description={"Astolfo comes for you, with friendly and unfriendly variants."}
                    link={"/project/astolfoiscomingforyou"}
                />
                <Project image={astolfOS} imageAlt={"AstolfOS desktop"} title={"AstolfOS"} description={"An operating system with Astolfo."} link={"/project/astolfos"} />
                <Project
                    image={astolfoMod}
                    imageAlt={"Astolfo biome"}
                    title={"Astolfo Mod"}
                    description={"A Minecraft mod that adds many non-binary, transgender and femboy characters to the game."}
                    link={"/project/astolfomod"}
                />
                <Project
                    image={astolforp}
                    imageAlt="Minecraft main menu, but it says Astolfocraft: Femboy edition on the top and the panorama is replaced with Astolfo."
                    title="Astolfo Resource Pack"
                    description="A resource pack for Minecraft with Astolfo."
                    link="/project/astolforesourcepack"
                />
                <Project image={catgirlNonsense} imageAlt={"Catgirl nonsense"} title={"Catgirl nonsense"} description={"Catgirl nonsense generator."} link={"/project/catgirlnonsense"} />
                <Project image={mcFuck} imageAlt={"MCFuck"} title={"MCFuck"} description={"An application to mess up your Minecraft settings."} link={"/project/mcfuck"} />
                <Project
                    image={nexusmodsFirefox}
                    imageAlt={"A Firefox extension showing list of blocked users, which hides them from comments."}
                    title={"Nexus Enhancements for Firefox"}
                    description={"A Firefox extension that allows hiding comments from bad users."}
                    link={"/project/nmfirefox"}
                />
                <Project
                    image={uwurandomRs}
                    imageAlt={"UwUrandom in Rust programming language"}
                    title={"uwurandom-rs"}
                    description={"Catgirl nonsense, but in the Rust programming langauge, for maximum femininity."}
                    link={"/project/uwurandom-rs"}
                />
                <Project
                    image={birthday}
                    imageAlt={"A window showing to wish someone a happy birthday, with a text box on the bottom"}
                    title={"Birthday"}
                    description={"Forces you to wish birthday to anyone in your circle so you never forget."}
                    link={"/project/birthday"}
                />
                <Project image={search} imageAlt={"A search engine"} title={"Nekosearch v2"} description={"An enchanced version of Nekosearch v1. Way more accurate than before."} link={"/project/neko/search2"} />
                <Project image={fediMeow} imageAlt={"Fedi Meow bot on a Sharkey instance"} title={"FediMeow"} description={"This is a bot that meows every hour on fedi."} link={"/project/fedi/meow"} />
                <Project
                    image={fediSummarizer}
                    imageAlt={"Fedi Summarizer bot on a Sharkey instance"}
                    title={"Fedi Summarizer"}
                    description={"This bot summarizes the amount of notes you post every midnight."}
                    link={"/project/fedi/summarizer"}
                />
                <Project
                    image={fediStreaks}
                    imageAlt={"Fedi Streaks bot on a Sharkey instance"}
                    title={"Fedi Streaks"}
                    description={"This bot counts consecutive days of you posting on fedi."}
                    link={"/project/fedi/streaks"}
                />

                <h1 className={"text-center text-2xl font-bold py-4"}>Luna&apos;s Mon Bazou mods</h1>

                <Project
                    title={"Mod List"}
                    image={monbazoumodlist}
                    imageAlt="A screenshot from the game showing the mod list button in the main menu."
                    description={"A mod list in the main menu of Mon Bazou. Allows changing mod settings."}
                    link={"/project/monbazou/modlist"}
                />
                <Project
                    title={"Winter Mod"}
                    image={monbazouwintermod}
                    imageAlt="A screenshot of the game Mon Bazou, in winter instead of spring. All the terrain and roads have snow."
                    description={"A winter mod that changes the weather to winter."}
                    link={"/project/monbazou/winter"}
                />

                <h1 className={"text-center text-2xl font-bold py-4"}>Luna&apos;s archived projects</h1>
                <p>A list of projects that are deprecated, archived or deleted. Downloads are available for certain projects.</p>
                <Project
                    title={"Cutie Quiz"}
                    description={"Cutie Quiz is a quiz app whic determines how cute you are. Archived and shut down on Oct 31st."}
                    image={cutieQuiz}
                    imageAlt={"Cutie Quiz"}
                    link={"/project/cutiequiz"}
                />
                <Project
                    title={"Nekosearch v1"}
                    description={"A instant, private and independently indexed search for Nekoweb, including content."}
                    image={search}
                    imageAlt={"Search engine"}
                    link={"https://mldkyt.nekoweb.org/project/neko/search"}
                />
                <Offset amt={6} />
                <Footer visits={props.visits} route={"/projects"} />
            </Content>
        </Main>
    );
}
