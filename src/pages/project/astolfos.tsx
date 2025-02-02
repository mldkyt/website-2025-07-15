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
import { Header } from "@/components/Generic/Header";
import Content from "@/components/Generic/Content";
import Heading from "@/components/Generic/Heading";
import Offset from "@/components/Generic/Offset";

import desktop from '@/images/astolfos/desktop.png';
import settings from '@/images/astolfos/settings.png';
import neofetch from '@/images/astolfos/neofetch.png';
import Image from "next/image";
import Link from "next/link";
import Metadata from "@/components/Generic/Metadata";
import { motion } from "motion/react";
import Footer from "@/components/Generic/Footer";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { countVisit, getVisits } from "@/backend/visitsCounter";
import Button from "@/components/Generic/Button";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    await countVisit({ route: '/project/astolfos' });
    const visits = await getVisits({ route: '/project/astolfos' });

    return {
        props: {
            visits
        }
    }
}

export default function AstolfOS(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <Main>
        <Metadata title={'AstolfOS'} description={'AstolfOS is a script that changes your Linux into AstolfOS!'} />
        <Header highlight={'projects'} />
        <Content>
            <Offset amt={4} />
            <Heading level={1}>AstolfOS</Heading>

            <p>AstolfOS transfers your Linux into AstolfOS!</p>
            <p>This script changes the OS name, KDE splash screen, GRUB configuration, neofetch configuration, and
                terminal style.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2">
                <Image src={desktop} alt="Desktop view of AstolfOS" />
                <Image src={settings} alt="Settings view of AstolfOS" />
                <Image src={neofetch} alt="Neofetch view of AstolfOS" />
            </div>

            <div>
                <Link href={'https://github.com/mldchan/AstolfOS/wiki/Manual-Installation'}>
                    <Button>Installation Guide</Button>
                </Link>
            </div>

            <Offset amt={3} />
            <Footer visits={props.visits} />
        </Content>
    </Main>
}
