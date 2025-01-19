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

import Content from "@/components/Generic/Content";
import ComplimentsTypewriter from "@/components/MainPage/ComplimentsTypewriter";
import Image from "next/image";
import bg from "@/images/bg.png";
import Offset from "@/components/Generic/Offset";

export default function Page1() {
    return (
        <>
            <div className={'h-screen bg-gradient-to-b from-[#351036] to-[#111]'}>


                <div className={'absolute left-1/2 w-1/3 z-10'}>
                    <Offset amt={5}/>
                    <Content>
                        <h1 className={'text-3xl font-bold text-white xl:text-5xl'}>mldchan</h1>
                        <span
                            className={'inline-flex flex-wrap xl:text-lg'}>Full time <ComplimentsTypewriter/> girl.</span>
                        <br/>
                        <span className={'xl:text-lg'}>Transfem developer.</span>
                    </Content>
                </div>
                <div
                    className={'absolute w-screen h-1/8 bottom-0 bg-gradient-to-b from-[#00000000] to-[#111] h-16 z-20'}></div>
                <Image src={bg} alt={'mldchan anime girl peace sign'}
                       className={'absolute object-contain h-screen'}/>
            </div>
        </>
    )
}
