/*
 *     Lunya's Personal Website
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

export default function Button(props: {
    children: string,
    onClick?: () => void,
    type?: 'button' | 'submit' | 'reset',
    disabled?: boolean,
    fullWidth?: boolean
}) {
    return (
        <button
            type={props.type}
            onClick={props.onClick}
            disabled={props.disabled === true}
            className={`p-1 px-2 bg-pink-400 hover:bg-pink-300 text-black transition-all rounded-lg drop-shadow-md cursor-pointer ${props.fullWidth ? 'w-full' : ''}`}>{props.children}</button>
    )
}