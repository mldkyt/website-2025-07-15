/*
 *     Lunya's Personal Website
 *     Copyright (C) 2024-2025  Lunya UwU :3
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

import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import Main from "@/components/Generic/Main";
import Metadata from "@/components/Generic/Metadata";
import Content from "@/components/Generic/Content";
import {Header} from "@/components/Generic/Header";
import Heading from "@/components/Generic/Heading";
import Turnstile from "react-turnstile";
import {useState} from "react";
import {captureException} from "@sentry/nextjs";
import { PrismaClient } from "@prisma/client";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const {blog} = ctx.params as { blog: string };

    const prisma = new PrismaClient();
    await prisma.$connect();

    const blogPost = await prisma.blogposts.findFirst({
        where: {
            handle: blog
        }
    });

    if (!blogPost) {
        await prisma.$disconnect();
        return {
            notFound: true
        }
    }

    await prisma.$disconnect();

    let privacyWarning = false;

    const gpcHeader = ctx.req.headers['sec-gpc'];

    if (gpcHeader === "1") {
        privacyWarning = true;
    }

    const dntHeader = ctx.req.headers['dnt'];

    if (dntHeader === "1") {
        privacyWarning = true;
    }

    return {
        props: {
            handle: blogPost.handle,
            title: blogPost.title,
            description: blogPost.description,
            views: blogPost.views,
            cloudflareSiteToken: process.env['CLOUDFLARE_SITE_TOKEN']!,
            privacyWarning
        }
    }

}


export default function Blog(props: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const [error, setError] = useState("");

    function proveInnocence(token: string) {
        fetch('/api/blog/count', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'blogPost': props.handle,
                'cfToken': token
            })
        }).then(x => {
            if (x.ok) {
                x.json().then(y => {
                    location.href = y.url
                }).catch(y => {
                    setError(`Error parsing JSON: ${y}`)
                    captureException(y);
                })
            } else {
                x.json().then(y => {
                    setError(`Error: ${x.statusText}: ${y.error}`)
                }).catch(y => {
                    setError(`Error parsing JSON: ${y}`)
                    captureException(y);
                })
            }
        }).catch(y => {
            setError(`Error making request: ${y}`);
            captureException(y);
        });
    }

    return <Main>
        <Metadata title={props.title} description={`${props.description} | ${props.views} views`}/>
        <Header/>
        <Content>
            <Heading level={1}>pwease verify 🥺</Heading>
            <p>due to bot attacks and too much scraping, this website requires bot checks :3</p>

            <p>once the bot check finished, you&apos;ll automatically go to the blog :33</p>

            
            {props.privacyWarning && <div className="bg-yellow-800 p-2 m-1 rounded-lg drop-shadow-lg">
                <h2><strong>warning: </strong> i noticed you got one of DNT or SEC set up :3 i&pos;ll not count your visit :3</h2>
            </div>}

            <Turnstile sitekey={props.cloudflareSiteToken} onVerify={x => proveInnocence(x)}/>

            {error && <p className={'text-red-600'}>{error}</p>}

            <p className={'text-sm text-gray-500'}>this page was displayed for the 
                lunya.pet/blog/&lt;url&gt; links for my blogs and for analytical purposes uwu</p>
        </Content>
    </Main>
}