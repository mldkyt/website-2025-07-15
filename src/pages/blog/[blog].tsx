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

import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import Main from "@/components/Generic/Main";
import Metadata from "@/components/Generic/Metadata";
import Content from "@/components/Generic/Content";
import {Header} from "@/components/Generic/Header";
import Offset from "@/components/Generic/Offset";
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

    return {
        props: {
            handle: blogPost.handle,
            title: blogPost.title,
            description: blogPost.description,
            views: blogPost.views,
            cloudflareSiteToken: process.env['CLOUDFLARE_SITE_TOKEN']!
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
            <Offset amt={4}/>
            <Heading level={1}>Please confirm yourself</Heading>
            <p>Due to too many bots visiting my site, I require people to verify they&apos;re not a bot. Everything that
                modifies the database has a bot check to prevent abuse.</p>

            <p>Once the bot check finishes, you&apos;ll automatically get redirected to the blog.</p>

            <Turnstile sitekey={props.cloudflareSiteToken} onVerify={x => proveInnocence(x)}/>

            {error && <p className={'text-red-600'}>{error}</p>}

            <p className={'text-sm text-gray-500'}>This page was displayed in order to have
                mldchan.dev/blog/&lt;url&gt; links for my blogs. It was also displayed to count views for my blogs.</p>
        </Content>
    </Main>
}