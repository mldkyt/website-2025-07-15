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

import React from "react";

import {motion} from "motion/react";
import Link from "next/link";

export default function Project(props: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image?: any,
    imageAlt?: string,
    title: string,
    description: string,
    link?: string
}) {

    let base = <></>;

    if (props.image && props.imageAlt) {
        base = <motion.div className={'flex flex-row h-[96px] bg-[#222] rounded-lg p-2 my-4 drop-shadow-md'}
                           whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
            <div style={{
                backgroundImage: `url(${props.image.src})`
            }} className={'w-[80px] h-[80px] rounded-lg bg-cover bg-center bg-no-repeat'}>
            </div>
            <div>
                <h1 className={'text-xl font-bold ml-2'}>{props.title}</h1>
                <p className={'ml-4 text-gray-400 text-sm lg:text-base'}>{props.description}</p>
            </div>
        </motion.div>;
    } else {
        base = <motion.div className={'flex flex-row h-[96px] bg-[#222] rounded-lg p-2 my-4 drop-shadow-md'}
                           whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
            <div>
                <h1 className={'text-xl font-bold ml-2'}>{props.title}</h1>
                <p className={'ml-2 text-gray-400'}>(no image) {props.description}</p>
            </div>
        </motion.div>;
    }

    if (props.link) {
        return <Link href={props.link}>
            {base}
        </Link>
    }

    return base;
}