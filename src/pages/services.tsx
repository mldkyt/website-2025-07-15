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

import Main from '@/components/Generic/main';
import { Header } from '@/components/Generic/header';
import Content from '@/components/Generic/content';
import Offset from '@/components/Generic/offset';
import Service from '@/components/Services/service';
import Metadata from '@/components/Generic/metadata';
import Footer from '@/components/Generic/footer';
import { getVisits } from '@/backend/visits-counter';

export async function getServerSideProps() {
    const visits = await getVisits({ route: '/services' });

    return {
        props: {
            visits,
        },
    };
}

export default function Services(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Main>
            <Metadata title={'Services'} description={"Lunya's services"} />
            <Header highlight="services" />
            <Content>
                <h1 className={'text-center text-3xl font-bold py-4'}>Lunya&apos;s Services</h1>

                <h2 className="text-xl font-bold">Public services</h2>
                <p>Anyone can interact with these in some way!</p>

                <Service
                    svcName={'Akabot: Discord bot'}
                    svcDesc={'Akabot is my own free and open source Discord bot. this is its official instance.'}
                    links={[
                        {
                            label: 'add it now!',
                            url: 'https://discord.com/oauth2/authorize?client_id=1172922944033411243',
                        },
                        {
                            label: 'view project page',
                            url: '/project/akabot',
                        },
                    ]}
                />
                <Service
                    svcName={'Sharkey for friends'}
                    svcDesc={'i use this to communicate with frens :3'}
                    links={[
                        {
                            label: 'open it :3',
                            url: 'https://fedi.lunya.pet',
                        },
                        {
                            label: 'view my profile',
                            url: 'https://fedi.lunya.pet/@Lunya',
                        },
                    ]}
                />
                <Service
                    svcName={'nsfw Sharkey instance (18+)'}
                    svcDesc={'this instance runs for my lewd alt and a few other users'}
                    links={[
                        {
                            label: 'open (registrations are open)',
                            url: 'https://desparatesluts.online/',
                        },
                    ]}
                />
                <Service
                    svcName={'Forgejo: Code forge'}
                    svcDesc={'i use this to host my code :3'}
                    links={[
                        {
                            label: 'open Forgejo',
                            url: 'https://git.lunya.pet',
                        },
                        {
                            label: 'open my profile on Forgejo',
                            url: 'https://git.lunya.pet/Lunya',
                        },
                    ]}
                />
                <Service
                    svcName={'website'}
                    svcDesc={'this very website :3'}
                    links={[
                        {
                            label: 'home page',
                            url: 'https://lunya.pet',
                        },
                    ]}
                />
                <Service
                    svcName={'FediMeow: Meowing for for fedi'}
                    svcDesc={'meows hourly :3'}
                    links={[
                        {
                            label: '',
                            url: 'https://fedi.lunya.pet/@FediMeow',
                        },
                    ]}
                />
                <Service
                    svcName={'Fedi Streaks: Akabot Chat Streaks for the fediverse'}
                    svcDesc={'this bot gives you consencutive days of activity :3'}
                    links={[
                        {
                            label: 'Fediverse profile for the official account',
                            url: 'https://fedi.lunya.pet/@FediStreaks',
                        },
                    ]}
                />
                <Service
                    svcName={'Fedi Summary: Akabot Chat Summary for the fediverse'}
                    svcDesc={'this bot gives you a count of how many notes you have every midnight :3'}
                    links={[
                        {
                            label: 'official account',
                            url: 'https://fedi.lunya.pet/@FediSummary',
                        },
                    ]}
                />

                <Offset amt={6} />
                <Footer visits={props.visits} route={'/services'} />
            </Content>
        </Main>
    );
}
