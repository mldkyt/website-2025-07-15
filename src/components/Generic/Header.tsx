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

import {Inter} from "next/font/google";
import {ReactNode} from "react";
import Link from "next/link";
import logo from '@/images/logo.png';
import Image from "next/image";
import {motion} from "motion/react";

const inter = Inter({subsets: ['latin', 'latin-ext']})

function link(props: { baseProps: { highlight?: string }, href: string, highlight: string, children: ReactNode }) {
    return (
        <motion.li className={'my-0'} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}>
            <Link
                href={props.href}
                className={`${props.baseProps.highlight === props.highlight ? 'text-pink-400' : ''} hover:text-pink-200`}>
                {props.children}
            </Link>
        </motion.li>
    )
}

export function Header(props: {
    highlight?: string
}) {

    return (
        <header
            className={`${inter.className} fixed top-8 left-1/2 -translate-x-1/2 w-[90vw] m-auto bg-[#222b] hover:bg-[#222] transition-all shadow-sm rounded-lg p-2 z-50`}>
            <ul className={'list-none flex flex-row flex-wrap space-x-6'}>
                <motion.li className={'my-0'} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}><h1>
                    <Link href={'/'}><Image src={logo} alt={'Logo'} height={24}/></Link>
                </h1></motion.li>
                {link({href: '/projects', highlight: 'projects', children: 'Projects', baseProps: props})}
                {link({href: '/socials', highlight: 'socials', children: 'Socials', baseProps: props})}
                {link({href: '/donate', highlight: 'donate', children: 'Donate!', baseProps: props})}
                {link({
                    href: 'https://mldkyt.nekoweb.org',
                    highlight: 'null',
                    children: 'Legacy website',
                    baseProps: props
                })}
            </ul>
        </header>
    )
}
