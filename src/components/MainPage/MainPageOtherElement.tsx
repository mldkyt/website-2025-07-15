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

import {motion} from "motion/react";
import Link from "next/link";

export default function MainPageOtherElement(params: {
    title: string,
    description: string,
    link: string
}) {
    return (
        <Link href={params.link}>
            <motion.div className={'p-2 rounded-lg drop-shadow-md bg-[#222] my-6'} whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}>
                <h1 className={'text-xl font-bold m-1'}>{params.title}</h1>
                <p className={'m-1 ml-2'}>{params.description}</p>
            </motion.div>
        </Link>
    )
}
