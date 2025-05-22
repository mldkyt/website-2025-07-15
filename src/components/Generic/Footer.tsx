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

import Link from "next/link";
import {captureException} from "@sentry/nextjs";

export default function Footer(props: { visits?: number, route?: string }) {
    function countVisit() {
        if (props.route === undefined) return;

        fetch('/api/visits/count', {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                'route': props.route
            })
        }).then(() => {}).catch(x => {
            captureException(x);
        });
    }

    const hasRan = React.useRef(false);

    React.useEffect(() => {
      if (!hasRan.current) {
        hasRan.current = true;
        countVisit();
      }
    });

    return (<footer className={'w-full flex flex-row justify-evenly h-36'}>
        <div className={'w-max'}>
            <Link href={'/guestbook'} className={'text-pink-400 hover:text-pink-200'}>guestbook</Link>
        </div>
        <div className={'w-max'}>
            <Link href={'/donate'} className={'text-pink-400 hover:text-pink-200'}>donate uwu</Link>
        </div>
        <div className={'w-max'}>
            <Link href={'https://mldkyt.nekoweb.org'} className={'text-pink-400 hover:text-pink-200'}>legacy website</Link>
        </div>
        {props.visits !== undefined && <div>
            {props.visits} visits
        </div>}
    </footer>)
}