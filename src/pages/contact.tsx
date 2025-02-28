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

import React, { ReactElement } from "react";

import {Header} from "@/components/Generic/Header";
import Metadata from "@/components/Generic/Metadata";
import Offset from "@/components/Generic/Offset";
import Heading from "@/components/Generic/Heading";
import Content from "@/components/Generic/Content";
import Main from "@/components/Generic/Main";
import Footer from "@/components/Generic/Footer";
import {InferGetServerSidePropsType} from "next";
import {getVisits} from "@/backend/visitsCounter";
import Button from "@/components/Generic/Button";

function ContactWrapper(props: {
    name: string; children: ReactElement | ReactElement[];
}) {
    return <div className={'rounded-lg px-2 p-1 bg-[#222] mt-4'}>
        <h2 className={'text-xl font-bold'}>{props.name}</h2>
        {props.children}
    </div>
}

export async function getServerSideProps() {
    const visits = await getVisits({route: '/contact'});

    return {
        props: {
            visits,
            cloudflareSiteToken: process.env['CLOUDFLARE_SITE_TOKEN']!
        }
    }
}


export default function Contact(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [cw, setCw] = React.useState('');
    const [message, setMessage] = React.useState('');

    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState('');

    const send = () => {
        fetch('/api/anonmessages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                cw: cw
            })
        }).then(x => {
            if (x.ok) {
                setSuccess(true);
            } else {
                x.json().then(y => {
                    setError(y.error);
                }).catch(e => {
                    setError(`Error: ${x.statusText}: ${e}`);
                })
            }
        }).catch(e=>{
            setError(`Error: ${e}`);
        })
    }

    return <Main>
        <Header highlight={'contact'}/>
        <Metadata title={'Contact mldchan'} description={'This page contains information on how to contact mldchan.'}/>
        <Content>
            <Offset amt={4}/>
            <Heading level={1}>Contact mldchan</Heading>

            <p>NEW! Send an anonymous message to mldchan!</p>

            <label htmlFor="cw">Optional CW</label>
            <br/>
            <input value={cw} onChange={(e) => setCw(e.target.value)} className={'bg-[#333] rounded-lg p-1 px-2 w-full'} type="text" name="cw" id="cw"></input>
            <br/>
            <label htmlFor="message">Message</label>
            <br/>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} className={'bg-[#333] rounded-lg p-1 px-2 w-full'} name="message"></textarea>
            <Button onClick={send}>Submit!</Button>

            {success && <p className="text-green-500">Message was sent successfully!</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            <p>Welcome to the contact page for mldchan! This page contains information on how to contact me.</p>

            <ContactWrapper name={'Matrix'}>
                <p><code className="text-pink-400">@mld:mldchan.dev</code></p>
                <p>DM&apos;s open! DM me here and I&apos;ll respond.</p> 
                <p>This is one of my preferred methods of getting DM&apos;s, alongside e-mail with PGP encryption.</p>
            </ContactWrapper>

            <ContactWrapper name={'E-mail'}>
                <p>Shoot an e-mail to mldkyt@proton.me and I&apos;ll respond pretty quickly (if I&apos;m awake, notifications for
                    mail are the only notifications that work for me).</p>
                <p>If you can, please use my PGP encryption key.</p>
                <details className={'flex flex-col'}>
                    <summary className="text-pink-400">PGP key</summary>
                    <span>-----BEGIN PGP PUBLIC KEY BLOCK-----</span>
                    <span>xjMEYlkSUxYJKwYBBAHaRw8BAQdAu4mI1rh++Hs5sje8tAMphgKlI2kKV970</span>
                    <span>iasMTaN7X13NI21sZGt5dEBwcm90b24ubWUgPG1sZGt5dEBwcm90b24ubWU+</span>
                    <span>wo8EEBYKACAFAmJZElMGCwkHCAMCBBUICgIEFgIBAAIZAQIbAwIeAQAhCRBl</span>
                    <span>AqxNN8Q71RYhBBtBC0ezWIAvuCw672UCrE03xDvVXToA/jPnqCB7c8GVC/aR</span>
                    <span>VsllAfyFRrIoWVBoB1pSWLaweyrkAP9k72iGrP5QaCgPQdfPOIAMOpe4kIUy</span>
                    <span>+yvx5SWKFVJGBc44BGJZElMSCisGAQQBl1UBBQEBB0D0EdA5b7R2wrvnb9oC</span>
                    <span>CCL6c5AN2BPzqssDjGDa647aAAMBCAfCeAQYFggACQUCYlkSUwIbDAAhCRBl</span>
                    <span>AqxNN8Q71RYhBBtBC0ezWIAvuCw672UCrE03xDvVSTsBAJmrjQDvWTc0o8Bc</span>
                    <span>Nk7LvTn0EDHm4f41+caQP+pJ5hVzAQD41Z/3148gLSnSk1+Ag7/X+fIq48Z1</span>
                    <span>IfUESpuXCag2Dg==</span>
                    <span>=T/61</span>
                    <span>-----END PGP PUBLIC KEY BLOCK-----</span>
                </details>
            </ContactWrapper>

            <ContactWrapper name={'Discord'}>
                <p>Add me on Discord! <code className="text-pink-400">uwu.grl</code>! Please note I might remove you for various reasons, so please do not misuse this 🥺.</p>
            </ContactWrapper>

            <Offset amt={2}/>
            <p>This page is kind of dead as of now... I tried to add as many contact methods but I kind of realized I
                don&apos;t have that many. But I feel like that everyone has an e-mail account which they can use to e-mail
                me.</p>

            <Offset amt={3}/>
        </Content>
        <Footer visits={props.visits} route={'/contact'} cloudflareSiteToken={props.cloudflareSiteToken}/>
    </Main>

}
