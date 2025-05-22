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

import Image from "next/image";
import Link from "next/link";

export default function Project(props: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image?: any,
    imageAlt?: string,
    title: string,
    description: string,
    link?: string
}) {

    return <div className="bg-[#222] rounded-xl m-4">
        <Link href={props.link ?? ''}>
            {props.image && props.imageAlt && <Image className="h-[256px] object-cover rounded-t-xl" src={props.image} alt={props.imageAlt} width={1024} height={1024} /> }
            <h1 className="font-bold text-xl m-2">{props.title}</h1>
            <p className="m-2">{props.description}</p>
        </Link>
    </div>;
}