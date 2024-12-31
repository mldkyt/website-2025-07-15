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

import Main from "@/components/Generic/Main";
import {Header} from "@/components/Generic/Header";
import Content from "@/components/Generic/Content";
import Offset from "@/components/Generic/Offset";
import Heading from "@/components/Generic/Heading";
import Link from "next/link";

import regPlateChanger from '@/images/regplatechanger.webp';
import Image from "next/image";
import Metadata from "@/components/Generic/Metadata";
import {motion} from "motion/react";
import Footer from "@/components/Generic/Footer";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {countVisit, getVisits} from "@/backend/visitsCounter";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    await countVisit({route: '/project/regplatechanger'});
    const visits = await getVisits({route: '/project/regplatechanger'});

    return {
        props: {
            visits
        }
    }
}

export default function RegPlateChanger(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Main>
            <Metadata title={'Reg Plate Changer'}
                      description={'Reg Plate Changer is a mod for My Summer Car that allows you to customize the registration plates on every vehicle in the game.'}/>
            <Header highlight={'projects'}/>
            <Content>
                <Offset amt={3}/>
                <Heading level={1}>Reg Plate Changer</Heading>
                <p>
                    Hey everyone, I'm excited to share the Reg Plate Changer mod for My Summer Car!
                </p>
                <p>
                    With Reg Plate Changer, you can replace the standard
                    registration plates on every vehicle in the game with your own
                    custom.
                </p>
                <p>
                    Getting started is easy. The{" "}
                    <Link className={'text-pink-400 hover:text-pink-200'}
                          href="https://codeberg.org/mldchan/RegPlateChanger/src/branch/master/Example%20Image">
                        <motion.span whileTap={{scale: 0.9}} whileHover={{scale: 1.1}}>assets
                            folder
                        </motion.span>
                    </Link> includes a helpful README.jpg file that'll guide you through installation
                    and customization. In no time, you'll be hitting the road in your
                    personalized ride!
                </p>

                <Image src={regPlateChanger} alt={'Reg Plate Changer mod showcase'} className={'p-1 rounded-lg'}/>


                <Link href="https://git.mldchan.dev/MSCMods/RegPlateChanger"
                      className={'text-pink-400 hover:text-pink-200'}>
                    <motion.span whileTap={{scale: 0.9}} whileHover={{scale: 1.1}}>GitLab</motion.span>
                </Link>

                <Offset amt={3}/>
                <Footer visits={props.visits}/>
            </Content>
        </Main>
    )
}
