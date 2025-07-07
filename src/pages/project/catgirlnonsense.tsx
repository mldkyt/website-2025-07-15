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
import Link from 'next/link';

import Main from '@/components/Generic/main';
import { Header } from '@/components/Generic/header';
import Content from '@/components/Generic/content';
import Heading from '@/components/Generic/heading';
import Generator from '@/components/CatgirlNonsense/generator';
import Offset from '@/components/Generic/offset';
import Metadata from '@/components/Generic/metadata';
import Footer from '@/components/Generic/footer';
import { getVisits } from '@/backend/visits-counter';
import Button from '@/components/Generic/button';

export async function getServerSideProps() {
    const visits = await getVisits({ route: '/project/catgirlnonsense' });

    return {
        props: {
            visits,
        },
    };
}

export default function CatgirlNonsense(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Main>
            <Metadata title={'Catgirl Nonsense'} description={'Catgirl Nonsense generator'} />
            <Header highlight={'projects'} />
            <Content>
                <Heading level={1}>Catgirl nonsense generator uwu :3</Heading>
                <Generator />
                <br />
                <Link href={'/discord'}>
                    <Button fullWidth>join my Discord server for support :3</Button>
                </Link>
                <Offset amt={2} />
                <Footer visits={props.visits} route={'/project/catgirlnonsense'} />
            </Content>
        </Main>
    );
}
