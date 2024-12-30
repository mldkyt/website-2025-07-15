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
import Image from "next/image";

import one from '@/images/cutiequiz/1.png';
import two from '@/images/cutiequiz/2.png';
import three from '@/images/cutiequiz/3.png';
import Metadata from "@/components/Generic/Metadata";
import {motion} from "motion/react";

export default function Template() {
    return (
        <Main>
            <Metadata title={'Cutie Quiz'}
                      description={'[DEPRECATED] Cutie Quiz was a tiny app which takes a username and then determines how cute you are by analyzing brain waves.'}/>
            <Header highlight={'projects'}/>
            <Content>
                <Offset amt={3}/>
                <Heading level={1}>Cutie Quiz</Heading>

                <div className={'bg-red-800 p-2 rounded-lg border-2 border-red-600 drop-shadow-md'}>
                    <h2 className={'text-lg font-bold'}>No longer updated</h2>
                    <p>This project was scheduled for shutdown on Oct 31st. You will always be able to view the source
                        code.</p>
                </div>
                <p>
                    Cutie Quiz is a tiny app which takes a username and then determines how cute you are by analyzing
                    brain waves.
                </p>
                <p>
                    It does this using revolutionary next-generation technology, which is newer and better than AI and
                    determines values without errors. It has such good accuracy that you don't need any other source of
                    information to verify your results because our results are always accurate.
                </p>
                <p>
                    <i>
                        This application is a joke if you didn't figure it out yet.
                    </i>
                </p>

                <Heading level={2}>Images</Heading>
                <Image src={one} alt={'Cutie Quiz 1'} className={'p-1 rounded-lg'}/>
                <Image src={two} alt={'Cutie Quiz 2'} className={'p-1 rounded-lg'}/>
                <Image src={three} alt={'Cutie Quiz 3'} className={'p-1 rounded-lg'}/>

                <Link href="https://github.com/mldchan/CutieQuiz">
                    <motion.span whileTap={{scale: 0.9}} whileHover={{scale: 1.1}}>Source code</motion.span>
                </Link>

                <Offset amt={3}/>
            </Content>
        </Main>
    )
}
