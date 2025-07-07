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
import Button from '@/components/Generic/button';

export async function getServerSideProps() {
    const visits = await getVisits({ route: '_TEMPLATE' });

    return {
        props: {
            visits,
        },
    };
}

export default function Template(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Main>
            <Header highlight={'projects'} />
            <Content>
                <Offset amt={4} />
                <Heading level={1}>PROJECT</Heading>

                <div className="flex flex-col gap-2">
                    <Link href="LINK 1">
                        <Button>LINK 1</Button>
                    </Link>
                    <Link href="SOURCE LINK">
                        <Button>SOURCE</Button>
                    </Link>
                </div>

                <Offset amt={3} />
                <Footer visits={props.visits} route={'_TEMPLATE'} />
            </Content>
        </Main>
    );
}
