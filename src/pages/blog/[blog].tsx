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

import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import postgres from "postgres";
import Main from "@/components/Generic/Main";
import Metadata from "@/components/Generic/Metadata";
import Head from "next/head";
import Content from "@/components/Generic/Content";
import Link from "next/link";
import Button from "@/components/Generic/Button";
import {Header} from "@/components/Generic/Header";
import Offset from "@/components/Generic/Offset";
import Heading from "@/components/Generic/Heading";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const {blog} = ctx.params as { blog: string };

    const sql = postgres();

    await sql`create table if not exists blogPosts
              (
                  id          serial primary key,
                  handle      text    not null unique,
                  title       text    not null,
                  description text    not null,
                  created     timestamp        default now(),
                  updated     timestamp        default now(),
                  targetURL   text    not null,
                  views       integer not null default 0
              );`

    const blogPost = await sql`select *
                               from blogPosts
                               where handle = ${blog}`;

    if (blogPost.length === 0) {
        await sql.end();
        return {
            notFound: true
        }
    }

    await sql`update blogPosts
              set views = views + 1
              where handle = ${blog}`;

    await sql.end();

    return {
        props: {
            title: blogPost[0].title,
            description: blogPost[0].description,
            targetURL: blogPost[0].targeturl,
            views: blogPost[0].views
        }
    }

}


export default function Blog(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <Main>
        <Metadata title={props.title} description={`${props.description} | ${props.views} views`}/>
        <Head>
            <meta httpEquiv="refresh" content={`1;url=${props.targetURL}`}/>
        </Head>
        <Header/>
        <Content>
            <Offset amt={4}/>
            <Heading level={1}>Redirecting...</Heading>
            <p>You are being redirected to the blog.</p>
            <p>{`This blog was seen ${props.views} times.`}</p>
            <Link href={props.targetURL}>
                <Button>Click this button if you weren't redirected :3c</Button>
            </Link>
            <p className={'text-sm text-gray-500'}>This page was displayed in order to have
                mldchan.dev/blog/&lt;url&gt; links for my blogs. It was also displayed to count views for my blogs.</p>
        </Content>
    </Main>
}