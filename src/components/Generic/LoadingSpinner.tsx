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
import {useEffect, useState} from "react";

export default function LoadingSpinner() {
    const [show, setShow] = useState(true);
    const [render, setRender] = useState(true);

    useEffect(() => {
        async function getLoader() {
            const {ring2} = await import('ldrs');
            ring2.register();
        }

        getLoader();

        setTimeout(function () {
            setShow(false)
            setTimeout(function () {
                setRender(false);
            }, 500)
        }, 500)
    }, []);

    if (!render) return null;

    return <motion.div className={'w-full h-full fixed left-0 top-0 bg-[#111] z-50 pointer-events-none'}
                       animate={{opacity: show ? '100%' : '0'}}>
        <div className={'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'}>
            <l-ring-2
                size="48"
                stroke="9"
                stroke-length="0.30"
                bg-opacity="0.1"
                speed="0.4"
                color="#ff77ff"
            ></l-ring-2>
        </div>
    </motion.div>
}