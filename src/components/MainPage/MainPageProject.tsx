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

export default function MainPageProject(props: {
    title: string,
    body: string,
    image: any,
    imgAlt: string,
    className: string,
    link: string
}) {
    return (
        <motion.div className={`flex flex-col ${props.className} bg-[#222] rounded-lg drop-shadow-lg`}
                    whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
            <Link href={props.link}>
                <div className={'flex-grow rounded-t-lg shadow-inner h-[10vh] lg:h-[18vh] xl:h-[25vh]'} style={{
                    backgroundImage: `url(${props.image})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}></div>
                <h1 className={'mx-1 lg:mx-4 mt-2 font-bold'}>{props.title}</h1>
                <p className={'mb-1 mx-2 lg:mx-8 text-gray-500 text-sm'}>{props.body}</p>
            </Link>
        </motion.div>
    )
}
