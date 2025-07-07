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
import Link from 'next/link';
import { InferGetServerSidePropsType } from 'next';

import Main from '@/components/Generic/main';
import { Header } from '@/components/Generic/header';
import Content from '@/components/Generic/content';
import Offset from '@/components/Generic/offset';
import Heading from '@/components/Generic/heading';
import Footer from '@/components/Generic/footer';
import { getVisits } from '@/backend/visits-counter';
import Disclaimer from '@/components/Generic/disclaimer';
import Button from '@/components/Generic/button';
import Metadata from '@/components/Generic/metadata';

export async function getServerSideProps() {
    const visits = await getVisits({ route: '/project/monbazou/wintermod' });

    return {
        props: {
            visits,
        },
    };
}

export default function WinterMod(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Main>
            <Metadata title="Mon Bazou Winter Mod" description="The Mon Bazou Winter Mod changes the Mon Bazou game to take place in winter." />
            <Header highlight={'projects'} />
            <Content>
                <Heading level={1}>Winter Mod for Mon Bazou</Heading>

                <Disclaimer title="Work in Progress" message="This mod is very early in development. Beta versions are available for download, but note they aren't finished and the final project might change." />

                <p className="my-2">The Mon Bazou Winter Mod changes the game&apos;s textures to be in a winter style.</p>

                <ul className="list-disc ml-6">
                    <li>
                        <strong>Winter Textures</strong>: Replaces all textures with winter ones.
                    </li>
                    <li>
                        <strong>Winter Roads</strong>: Roads are winter textured. (they&apos;ll behave like that in the next updates)
                    </li>
                    <li>
                        <strong>Temperature Stat</strong>: A new stat for the player that increases as the player works outside. They can now freeze to death. (Not finished)
                    </li>
                    <li>
                        <strong>More!</strong>: Suggestions are welcome. Suggest the changes inside the Mon Bazou Modding server, by either pinging me or finding the respective forum post for it in the mod-ideas formums.
                    </li>
                </ul>

                <Offset amt={2} />

                <div className="flex flex-col gap-2">
                    <Link href="https://github.com/LunyaPet/MonBazouWinterMod/releases">
                        <Button fullWidth>Download latest release from GitHub</Button>
                    </Link>
                    <Link href="https://git.lunya.pet/Lunya/MonBazouWinterMod">
                        <Button fullWidth>Download source code</Button>
                    </Link>
                </div>

                <Offset amt={3} />
                <Footer visits={props.visits} route={'/project/monbazou/wintermod'} />
            </Content>
        </Main>
    );
}
