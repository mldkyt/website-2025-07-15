/*
 *     Lunya's Personal Website
 *     Copyright (C) 2024  Lunya UwU :3
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

import {Inter} from "next/font/google";
import {ReactNode} from "react";
import Link from "next/link";
import logo from '@/images/logo.png';
import Image from "next/image";

const inter = Inter({subsets: ['latin', 'latin-ext']})

function link(props: { baseProps: { highlight?: string }, href: string, highlight: string, children: ReactNode }) {
    return (
        <Link
            href={props.href}
            className={`${props.baseProps.highlight === props.highlight ? 'text-pink-400' : ''} hover:text-pink-200`}>
            {props.children}
        </Link>
    )
}

export function Header(props: {
    highlight?: string
}) {

    return (
        <header
            className={`${inter.className} p-4 z-50`}>
            <ul className={'list-none flex flex-row flex-wrap space-x-6 justify-center'}>
                <h1>
                    <Link href={'/'}><Image src={logo} alt={'Logo'} height={24}/></Link>
                </h1>
                {link({href: '/guestbook', highlight: 'guestbook', children: 'Guestbook', baseProps: props})}
                {link({href: '/projects', highlight: 'projects', children: 'Projects', baseProps: props})}
                {link({href: '/services', highlight: 'services', children: 'Services', baseProps: props})}
                {link({href: '/socials', highlight: 'socials', children: 'Socials', baseProps: props})}
                {link({href: '/donate', highlight: 'donate', children: 'Donate! <3', baseProps: props})}
            </ul>
        </header>
    )
}
