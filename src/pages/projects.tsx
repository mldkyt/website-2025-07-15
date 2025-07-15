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

import React from 'react';
import { InferGetServerSidePropsType } from 'next';

import Content from '@/components/Generic/content';
import { Header } from '@/components/Generic/header';
import Main from '@/components/Generic/main';
import Offset from '@/components/Generic/offset';
import Project from '@/components/Projects/project';
import akabot from '@/images/akabot.png';
import astolfoIsComingForYou from '@/images/astolfoiscomingforyou/safe_1.png';
import astolfoMod from '@/images/astolfomod/biome.png';
import astolforp from '@/images/astolforp/menu.png';
import catgirlNonsense from '@/images/catgirlnonsense.png';
import mcFuck from '@/images/mcfuck.png';
import nexusmodsFirefox from '@/images/nexusmodsfirefox.png';
import uwurandomRs from '@/images/uwurandomrs.png';
import birthday from '@/images/birthday/main.png';
import search from '@/images/search.png';
import fediMeow from '@/images/fedimeow.png';
import fediSummarizer from '@/images/fedi/summarizer/main.png';
import fediStreaks from '@/images/fedistreaks.png';
import monbazoumodlist from '@/images/monbazoumodlist.png';
import asphaltroads from '@/images/msc/asphaltroads.png';
import msclegacy from '@/images/msc/legacymsc.png';
import msctweaks from '@/images/msc/msctweaks.png';
import pridemod from '@/images/msc/pridemod.png';
import cutieQuiz from '@/images/cutiequiz/1.png';
import Metadata from '@/components/Generic/metadata';
import Footer from '@/components/Generic/footer';
import { getVisits } from '@/backend/visits-counter';

export async function getServerSideProps() {
    const visits = await getVisits({ route: '/projects' });

    return {
        props: {
            visits,
        },
    };
}

export default function Projects(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Main>
            <Metadata title={'Projects'} description={'A list of projects by Lunya.'} />
            <Header highlight={'projects'} />
            <Content>
                <h1 className={'text-center text-3xl font-bold py-4'}>Lunya&apos;s projects UwU :3</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    <Project image={akabot} imageAlt={'Akabot profile picture'} title={'Akabot'} description={'free and open source discord bot packed with features :3'} link={'/project/akabot'} />
                    <Project
                        image={astolfoIsComingForYou}
                        imageAlt={'Astolfo is coming for you window'}
                        title={'Astolfo is coming for you'}
                        description={'astolfo comes for you as a windows program! comfy and evil variations :3'}
                        link={'/project/astolfoiscomingforyou'}
                    />
                    <Project image={astolfoMod} imageAlt={'Astolfo biome'} title={'Astolfo Mod'} description={'adds femboys, and a trans girl into minecraft :3 along some other things :3'} link={'/project/astolfomod'} />
                    <Project
                        image={astolforp}
                        imageAlt="Minecraft main menu, but it says Astolfocraft: Femboy edition on the top and the panorama is replaced with Astolfo."
                        title="Astolfo Resource Pack"
                        description="Astolfo resource pack, with changes to sounds and language files too :3"
                        link="/project/astolforesourcepack"
                    />
                    <Project image={catgirlNonsense} imageAlt={'Catgirl nonsense'} title={'Catgirl nonsense'} description={'generate catgirl nonsense :3333 UwU >/////////<'} link={'/project/catgirlnonsense'} />
                    <Project image={uwurandomRs} imageAlt={'UwUrandom in Rust programming language'} title={'uwurandom-rs'} description={'catgirl nonsense but in Rust 🏳️‍⚧️ uwu'} link={'/project/uwurandom-rs'} />
                    <Project image={fediMeow} imageAlt={'Fedi Meow bot on a Sharkey instance'} title={'FediMeow'} description={'hourly meowing on fedi (needed)'} link={'/project/fedi/meow'} />
                    <Project
                        image={fediSummarizer}
                        imageAlt={'Fedi Summarizer bot on a Sharkey instance'}
                        title={'Fedi Summarizer'}
                        description={'gives you a count of your posts every midnight, along with some insights.'}
                        link={'/project/fedi/summarizer'}
                    />
                    <Project image={fediStreaks} imageAlt={'Fedi Streaks bot on a Sharkey instance'} title={'Fedi Streaks'} description={'counts consencutive days of activity :3'} link={'/project/fedi/streaks'} />
                </div>

                <h1 className="text-center text-2xl font-bold py-4">Lunya&apos;s My Summer Car mods</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    <Project
                        image={msctweaks}
                        imageAlt="An image of the MSC Logo with Tweaks written next to it, the background is blurred."
                        description="This mod adds a few tweaks to My Summer Car."
                        title="MSC Tweaks"
                        link="/project/msctweaks"
                    ></Project>
                    <Project
                        image={pridemod}
                        imageAlt="Picture of 2 pride flags placed in a MSC world, with a lesbian and a transgender one."
                        description="A mod that adds pride into My Summer Car"
                        title="Pride Mod"
                        link="/project/pridemod"
                    />
                    <Project
                        image={msclegacy}
                        imageAlt="Screenshot of the game menu with the mod settings open, showing a lot of options"
                        description="Reverts the game into old versions."
                        title="Legacy MSC"
                        link="/project/msclegacy"
                    />
                    <Project image={asphaltroads} imageAlt="Image of an asphalt road in place of a dirt one in MSC" description="Asphalt Roads mod for My Summer Car" title="Asphalt Roads" link="/project/asphaltroads" />
                </div>

                <h1 className={'text-center text-2xl font-bold py-4'}>Lunya&apos;s stale projects</h1>

                <div className="bg-yellow-700 p-2 rounded-xl text-center mx-4">
                    <p>Stale doesn&apos;t mean unmaintained. Projects in this category will not receive active updates.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    <Project
                        title={'Mod list'}
                        image={monbazoumodlist}
                        imageAlt="A screenshot from the game showing the mod list button in the main menu."
                        description={'a mod menu mod, adding a mod menu, settings and console.'}
                        link={'/project/monbazou/modlist'}
                    />
                    <Project
                        image={birthday}
                        imageAlt={'A window showing to wish someone a happy birthday, with a text box on the bottom'}
                        title={'Birthday app'}
                        description={'forces users to wish their friends bday before allowing u to use the pc :3'}
                        link={'/project/birthday'}
                    />
                    <Project
                        image={nexusmodsFirefox}
                        imageAlt={'A Firefox extension showing list of blocked users, which hides them from comments.'}
                        title={'Nexus enhancements for Firefox'}
                        description={'a Firefox extension that allows you to hide users in comments :3'}
                        link={'/project/nmfirefox'}
                    />
                    <Project image={mcFuck} imageAlt={'MCFuck'} title={'MCFuck'} description={'an options.txt file fucker :3'} link={'/project/mcfuck'} />
                </div>

                <h1 className={'text-center text-2xl font-bold py-4'}>Lunya&apos;s archived projects</h1>
                <p>A list of projects that are deprecated, archived or deleted. Downloads are available for certain projects.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    <Project
                        title={'Cutie Quiz'}
                        description={"cutie quiz uses the latest cuttin-edge technology to determine that you're cute :3"}
                        image={cutieQuiz}
                        imageAlt={'Cutie Quiz'}
                        link={'/project/cutiequiz'}
                    />
                    <Project
                        title={'Nekosearch v1'}
                        description={'instant, local search engine for nekoweb.org (not updated anymore)'}
                        image={search}
                        imageAlt={'Search engine'}
                        link={'https://mldkyt.nekoweb.org/project/neko/search'}
                    />
                </div>
                <Offset amt={6} />
                <Footer visits={props.visits} route={'/projects'} />
            </Content>
        </Main>
    );
}
