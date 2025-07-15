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
import React from 'react';
import Link from 'next/link';
import { InferGetServerSidePropsType } from 'next';

import Main from '@/components/Generic/main';
import { Header } from '@/components/Generic/header';
import Content from '@/components/Generic/content';
import Offset from '@/components/Generic/offset';
import Heading from '@/components/Generic/heading';
import Metadata from '@/components/Generic/metadata';
import Footer from '@/components/Generic/footer';
import { getVisits } from '@/backend/visits-counter';
import Button from '@/components/Generic/button';

const ModCategory = (props: { children: string }) => {
    return <h3 className={'text-xl font-bold my-6'}>{props.children}</h3>;
};

export async function getServerSideProps() {
    const visits = await getVisits({ route: '/project/goodoldmsc' });

    return {
        props: {
            visits,
        },
    };
}

export default function Template(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Main>
            <Metadata title={'Legacy MSC'} description={'Reverts the game into old versions.'} />
            <Header highlight={'projects'} />
            <Content>
                <Heading level={1}>MSC Legacy</Heading>

                <p>Reverts the game into old versions. The Legacy MSC mod includes:</p>

                <ModCategory>Legacy Car</ModCategory>
                <ul className={'ml-4 list-disc'}>
                    <li>Assemble Sounds</li>
                    <li>Disable Door Sounds</li>
                    <li>Disable Foot Sounds</li>
                    <li>Disable Knob Sounds</li>
                    <li>Old Dashboard</li>
                    <li>Info Text</li>
                    <li>Old Radio</li>
                    <li>Shift Delay Change</li>
                    <li>Key Sound Change</li>
                    <li>Green Selections</li>
                    <li>Engine Sound Type</li>
                    <li>Old RPM Gauge</li>
                    <li>Old Engine Revving</li>
                </ul>

                <ModCategory>Legacy Van</ModCategory>
                <ul className={'ml-4 list-disc'}>
                    <li>Remove Dashboard</li>
                    <li>Old Steering Wheel</li>
                    <li>Disable Horn</li>
                    <li>Instant Shifting</li>
                    <li>Old Engine Sound</li>
                    <li>Old Body Texture</li>
                    <li>Old Inside Texture</li>
                </ul>

                <ModCategory>Legacy Muscle Car</ModCategory>
                <ul className={'ml-4 list-disc'}>
                    <li>
                        Old Skins:
                        <ul className={'ml-4 list-disc'}>
                            <li>2016</li>
                            <li>Build 178</li>
                            <li>Red</li>
                            <li>Blue</li>
                            <li>Black</li>
                        </ul>
                    </li>
                    <li>
                        Old Wheels:
                        <ul className={'ml-4 list-disc'}>
                            <li>Wheels from 2016</li>
                            <li>Wheels from Build 178</li>
                            <li>Build &lt;176</li>
                        </ul>
                    </li>
                    <li>
                        Old Tachometer:
                        <ul className={'ml-4 list-disc'}>
                            <li>Remove</li>
                            <li>2016</li>
                        </ul>
                    </li>
                    <li>Remove Scoop</li>
                    <li>Old Engine</li>
                    <li>Remove Linelock Button</li>
                    <li>Remove Mudflaps</li>
                    <li>Old Suspension</li>
                    <li>Remove Rear Axle</li>
                    <li>Red Interior</li>
                    <li>Old License Plate</li>
                    <li>Remove Yellow Bar</li>
                    <li>Old Rear Wheels Size</li>
                </ul>

                <ModCategory>Legacy Highway Cars</ModCategory>
                <p>Replaces the following vehicles:</p>
                <ul className={'ml-4 list-disc'}>
                    <li>VICTRO, MENACE</li>
                    <li>SVOBODA</li>
                    <li>POLSA</li>
                </ul>
                <p>Does not replace the truck and the new LAMOREs.</p>

                <ModCategory>Legacy Tractor</ModCategory>
                <ul className={'ml-4 list-disc'}>
                    <li>Old Engine Sound</li>
                    <li>Old Engine Starting Sound</li>
                    <li>Disable Dashboard</li>
                    <li>Disable Forklift Arm</li>
                    <li>Make the forklift white</li>
                    <li>Old Starting System (Anti-Stall)</li>
                    <li>Disable Radio</li>
                </ul>

                <ModCategory>Legacy Truck</ModCategory>
                <ul className={'ml-4 list-disc'}>
                    <li>Radio Position</li>
                    <li>Engine Type</li>
                    <li>Remove Pedals</li>
                    <li>Remove Doors</li>
                    <li>Replace Shit Tank with Logs</li>
                    <li>Old Starting Sound</li>
                    <li>Black Interior</li>
                    <li>Red Exterior</li>
                    <li>Hide License Plate</li>
                    <li>Hide Mud Flaps</li>
                </ul>

                <ModCategory>Legacy World</ModCategory>
                <ul className={'ml-4 list-disc'}>
                    <li>Old Road</li>
                    <li>Old Dirt Road</li>
                    <li>Old Dirt Race Track</li>
                    <li>Old Driveway Texture</li>
                    <li>Remove Bridges</li>
                    <li>Remove Tree Walls</li>
                </ul>

                <Link href="https://www.nexusmods.com/mysummercar/mods/8947">
                    <Button>Download from NexusMods</Button>
                </Link>

                <Offset amt={3} />
                <Footer visits={props.visits} route={'/project/goodoldmsc'} />
            </Content>
        </Main>
    );
}
