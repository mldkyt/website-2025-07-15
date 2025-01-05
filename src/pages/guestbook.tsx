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
import {countVisit, getVisits} from "@/backend/visitsCounter";
import Main from "@/components/Generic/Main";
import {Header} from "@/components/Generic/Header";
import Content from "@/components/Generic/Content";
import Heading from "@/components/Generic/Heading";
import Offset from "@/components/Generic/Offset";
import Metadata from "@/components/Generic/Metadata";
import postgres from "postgres";
import dbinit from "@/backend/dbinit";
import Button from "@/components/Generic/Button";
import {FormEvent, useState} from "react";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    await countVisit({route: '/guestbook'});
    const visits = await getVisits({route: '/guestbook'});

    const forwarded = ctx.req.headers['x-forwarded-for'];
    const ip = typeof forwarded === 'string' ? forwarded.split(/, /)[0] : ctx.req.socket.remoteAddress;

    let allowPost: true | 'noip' | 'approval' | 'banned' = true;

    await dbinit();
    const sql = postgres({});

    if (ip) {

        const ipRows = await sql`select *
                                 from guestbook
                                 where ip = ${ip}
                                   and approved = 0;`

        if (ipRows.length > 0) {
            allowPost = 'approval';
        }

        const ban = await sql`select id
                              from guestbookbans
                              where ip = ${ip}`;
        if (ban.length > 0) {
            allowPost = 'banned';
        }

    } else {
        allowPost = 'noip';
    }

    const existingPosts = await sql`select id, username, body
                                    from guestbook
                                    where approved = 1
                                      and replyto IS NULL;`

    const posts = await Promise.all(existingPosts.map(async (x) => {
        const replies = await sql`select body
                                  from guestbook
                                  where replyto = ${x.id};`

        return {
            username: x.username, body: x.body, replies: replies.map(x => {
                return x.body
            })
        }
    }))

    await sql.end();

    return {
        props: {
            visits,
            post: allowPost,
            posts
        }
    }
}

export default function Guestbook(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [postForm, setPostForm] = useState(props.post);
    const [submitError, setSubmitError] = useState('');

    const guestbookSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const username = formData.get('username')?.toString() || '';
        const body = formData.get('body')?.toString() || '';

        if (username.length < 4 || username.length > 32 || body.length < 4 || body.length > 200) {
            setSubmitError('Your username must be between 4 and 32 characters and the body has to be between 4 and 200 characters.');
            return;
        }

        fetch('/api/guestbook/sign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                body
            })
        }).then(x => {
            if (x.ok) {
                setPostForm('approval');
            }
        })
    }

    return <Main>
        <Metadata title={'mldchan\'s guestbook'} description={'Sign mldchan\'s guestbook today!'}/>
        <Header highlight={'guestbook'}/>
        <Content>
            <Offset amt={3}/>
            <Heading level={1}>mldchan's Guestbook</Heading>

            {postForm === true && <form className={'p-2 rounded-lg drop-shadow-md bg-[#222]'}
                                        onSubmit={guestbookSubmit}>
                <h1 className={'text-2xl font-bold'}>Sign the guestbook</h1>

                <label htmlFor={'username'}>Username:</label>
                <br/>
                <input type={'text'} name={'username'} className={'bg-[#333] rounded-lg p-1 px-2 w-full'}/>

                <Offset amt={2}/>
                <label htmlFor={'body'}>Message:</label>
                <br/>
                <textarea name={'body'} className={'bg-[#333] rounded-lg p-1 px-2 w-full'}></textarea>

                <br/>
                <Button type={'submit'}>Submit!</Button>

                {submitError && <p className={'text-red-600'}>{submitError}</p>}
            </form>}

            {postForm === 'approval' &&
                <p>Your message on this guestbook is currently awaiting approval from mldchan. This is done to prevent
                    spam and
                    hate.</p>}
            {postForm === 'noip' &&
                <p>An unknown error on the server is preventing the IP address to be visible. We do not know who you
                    are.</p>}
            {postForm === 'banned' && <p>You were banned from posting on this guestbook.</p>}

            <Heading level={2}>Messages</Heading>
            {props.posts.length === 0 && <p>No messages yet. Make one now!</p>}
            {props.posts.map((x, i) => {
                return <div className={'bg-[#222] drop-shadow-md rounded-lg p-1 px-2 mt-4'} key={i}>
                    <h1 className={'text-xl font-bold'}>{x.username}</h1>
                    <p>{x.body}</p>
                    {x.replies.map((y, j) => {
                        return <div className={'ml-16 mt-4 border-2 border-white rounded-lg p-1 px-2'}>
                            <h2 className={'font-bold text-lg'}>mldchan
                                replied:</h2>
                            <p>{y}</p>
                        </div>
                    })}
                </div>
            })}
        </Content>
    </Main>
}
