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

import logo from '@/images/logo.png';
import {motion} from 'motion/react';
import Image from "next/image";
import Link from "next/link";
import Turnstile from "react-turnstile";
import {useState} from "react";
import {captureException} from "@sentry/nextjs";

export default function Footer(props: { visits?: number, route?: string, cloudflareSiteToken?: string }) {

    const [hasFinishedChallenge, setHasFinishedChallenge] = useState(false);

    function verifyCloudflare(token: string) {
        if (props.route === undefined) return;

        fetch('/api/visits/count', {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                'cfToken': token, 'route': props.route
            })
        }).then(x => {
            if (x.ok) {
                setHasFinishedChallenge(true);
                return;
            }
        }).catch(x => {
            captureException(x);
        })
    }

    return (<footer className={'w-full flex flex-row h-36'}>
        <div className={'w-1/2'}>
            <Link href={'/'}>
                <Image src={logo} alt={'Logo'} className={'m-auto w-1/3'}/>
            </Link>
        </div>
        <div className={'flex flex-col w-1/4'}>
            <motion.div whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className={'w-max'}>
                <Link href={'/projects'} className={'text-pink-400 hover:text-pink-200'}>Projects</Link>
            </motion.div>
            <motion.div whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className={'w-max'}>
                <Link href={'/socials'} className={'text-pink-400 hover:text-pink-200'}>Socials</Link>
            </motion.div>
            <motion.div whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className={'w-max'}>
                <Link href={'/services'} className={'text-pink-400 hover:text-pink-200'}>Services</Link>
            </motion.div>
            <motion.div whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className={'w-max'}>
                <Link href={'/donate'} className={'text-pink-400 hover:text-pink-200'}>Donate!</Link>
            </motion.div>
        </div>
        <div className={'flex flex-col w-1/4'}>
            <motion.div whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className={'w-max'}>
                <Link href={'/project/akabot'} className={'text-pink-400 hover:text-pink-200'}>Akabot</Link>
            </motion.div>
            <motion.div whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className={'w-max'}>
                <Link href={'https://youtube.com/@mldchan'}
                      className={'text-pink-400 hover:text-pink-200'}>YouTube</Link>
            </motion.div>
            {props.visits !== undefined && <div>
                {props.visits} visits
            </div>}

            {props.cloudflareSiteToken !== undefined && <>
                {hasFinishedChallenge || <>
                    <span>This site uses a captcha to verify counting of page visits. This captcha dissapears if it&apos;s successfull and your page visit is counted.</span>
                    <Turnstile sitekey={props.cloudflareSiteToken}
                               onVerify={(token) => verifyCloudflare(token)}></Turnstile>
                </>}
            </>}
        </div>
    </footer>)
}