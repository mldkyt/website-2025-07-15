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
import {getVisits} from "@/backend/visitsCounter";
import Main from "@/components/Generic/Main";
import {Header} from "@/components/Generic/Header";
import Content from "@/components/Generic/Content";
import Heading from "@/components/Generic/Heading";
import Offset from "@/components/Generic/Offset";
import Metadata from "@/components/Generic/Metadata";
import Button from "@/components/Generic/Button";
import {FormEvent, useState} from "react";
import Footer from "@/components/Generic/Footer";
import { PrismaClient } from "@prisma/client";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const visits = await getVisits({route: '/guestbook'});

    const forwarded = ctx.req.headers['x-forwarded-for'];
    const ip = typeof forwarded === 'string' ? forwarded.split(/, /)[0] : ctx.req.socket.remoteAddress;

    let allowPost: true | 'noip' | 'approval' | 'banned' = true;

    const prisma = new PrismaClient();
    await prisma.$connect();

    if (ip) {

        if (await prisma.guestbook.count({where: {IP: ip, Approved: 0}})) {
            allowPost = 'approval';
        }

        if (await prisma.guestbookBans.count({where: {IP: ip}})) {
            allowPost = 'banned';
        }

    } else {
        allowPost = 'noip';
    }

    const existingPosts = await prisma.guestbook.findMany({
        where: {
            Approved: 1,
            ReplyTo: null
        },
        orderBy: {
            Created: 'desc'
        },
        include: {
            other_guestbook: true
        }
    });

    await prisma.$disconnect();

    return {
        props: {
            visits,
            post: allowPost,
            posts: existingPosts.map(x => ({
                username: x.Username,
                body: x.Body,
                replies: x.other_guestbook.map(y => y.Body),
                created: x.Created!.toISOString()
            })),
            cloudflareSiteToken: process.env['CLOUDFLARE_SITE_TOKEN']!
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

    const formatTime = (iso: string) => {
        const date = new Date(iso);

        let month = `${date.getUTCMonth() + 1}`;
        if (month.length < 2) month = `0${month}`;
        let day = `${date.getUTCDate()}`;
        if (day.length < 2) day = `0${day}`;

        let hour = `${date.getUTCHours()}`;
        if (hour.length < 2) hour = `0${hour}`;
        let minute = `${date.getUTCMinutes()}`;
        if (minute.length < 2) minute = `0${minute}`;
        return `${date.getUTCFullYear()}/${month}/${day} ${hour}:${minute} UTC`;
    }

    return <Main>
        <Metadata title={'mldchan\'s guestbook'} description={'Sign mldchan\'s guestbook today!'}/>
        <Header highlight={'guestbook'}/>
        <Content>
            <Offset amt={4}/>
            <Heading level={1}>mldchan&apos;s Guestbook</Heading>

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
                    bigotry.</p>}
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
                        return <div key={j} className={'mt-4 bg-[#333] rounded-lg p-1 px-2 drop-shadow-md'}>
                            <h2 className={'font-bold text-lg'}>mldchan
                                replied:</h2>
                            <p>{y}</p>
                        </div>
                    })}
                    <p><small>Posted on {formatTime(x.created)}</small></p>
                </div>
            })}

            <Offset amt={4}/>
            <Footer visits={props.visits} route={'/guestbook'} cloudflareSiteToken={props.cloudflareSiteToken}/>
        </Content>
    </Main>
}
