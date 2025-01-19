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
import Image from "next/image";

export default function MainPageProject(props: {
    title: string,
    body: string,
    image: any,
    imgAlt: string,
    className: string,
    link: string
}) {
    return (
        <motion.div
            className={`flex flex-col ${props.className} bg-[#222] rounded-lg drop-shadow-lg overflow-hidden`}
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
        >
            <div className="relative w-full h-[10vh] lg:h-[18vh] xl:h-[25vh]">
                <Image
                    src={props.image}
                    alt={props.imgAlt}
                    fill
                    style={{objectFit: "cover", objectPosition: "center"}}
                    className="rounded-t-lg"
                />
            </div>
            <Link href={props.link} className="flex flex-col p-2">
                <h1 className="font-bold text-white">{props.title}</h1>
                <p className="text-gray-500 text-sm mt-2">{props.body}</p>
            </Link>
        </motion.div>
    )
}
