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
import {getVisits} from "@/backend/visitsCounter";
import Main from "@/components/Generic/Main";
import {Header} from "@/components/Generic/Header";
import Content from "@/components/Generic/Content";
import Heading from "@/components/Generic/Heading";
import Offset from "@/components/Generic/Offset";
import Metadata from "@/components/Generic/Metadata";
import {FormEvent, useState} from "react";
import Footer from "@/components/Generic/Footer";
import { PrismaClient } from "@prisma/client";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const visits = await getVisits({route: '/guestbook'});

    const forwarded = ctx.req.headers['x-forwarded-for'];
    const ip = typeof forwarded === 'string' ? forwarded.split(/, /)[0] : ctx.req.socket.remoteAddress;

    let allowPost: true | 'noip' | 'approval' | 'banned' = true;
    let privacyWarning = false;

    const gpcHeader = ctx.req.headers['sec-gpc'];

    if (gpcHeader === "1") {
        privacyWarning = true;
    }

    const dntHeader = ctx.req.headers['dnt'];

    if (dntHeader === "1") {
        privacyWarning = true;
    }

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
            privacyWarning
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
            else {
                x.json().then(y => {
                    if (y.error) {
                        setSubmitError(y.error);
                    }
                }).catch(y => {
                    setSubmitError(`Error: ${x.statusText}: ${y}`);
                })
            }
        }).catch(x => {
            setSubmitError(`Error: ${x}`);
        });
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
        return `${date.getUTCFullYear()}-${month}-${day} ${hour}:${minute} utc`;
    }

    return <Main>
        <Metadata title={'Lunya\'s guestbook'} description={'Sign Lunya\'s guestbook today!'}/>
        <Header highlight={'guestbook'}/>
        <Content>
            <Heading level={1}>Lunya&apos;s Guestbook</Heading>

            {postForm === true && <form className={'p-2 rounded-lg drop-shadow-md'}
                                        onSubmit={guestbookSubmit}>
                <h1 className={'text-2xl font-bold text-center'}>sign it 🥺</h1>

                {props.privacyWarning && <div className="bg-yellow-800 p-2 m-1 rounded-lg drop-shadow-lg">
                    <h2><strong>warning: </strong> your browser has Do Not Track active. this guestbook will link your request to an IP address to prevent abuse 🥺</h2>
                </div>}

                <label htmlFor={'username'} className="font-bold">name:</label>
                <br/>
                <input type={'text'} name={'username'} className={'bg-[#333] rounded-lg p-1 w-full'}/>

                <br />
                <label htmlFor={'body'} className="font-bold">message:</label>
                <br/>
                <textarea name={'body'} className={'bg-[#333] rounded-lg p-1 w-full'}></textarea>

                <br/>
                <br/>
                <button
                    type={"submit"}
                    className={'p-1 px-2 bg-pink-400 hover:bg-pink-300 transition-all rounded-lg drop-shadow-md cursor-pointer w-full'}>send it to me :3</button>
            </form>}

            {submitError && <p className={'bg-red-800 p-2 rounded-lg'}>{submitError}</p>}

            {postForm === 'approval' &&
                <p className="bg-blue-800 p-2 rounded-lg">thanks sis! wait for Lunya to approve your post :3</p>}
            {postForm === 'noip' &&
                <p className="bg-red-800 p-2 rounded-lg">we couldn&apos;t find your IP address :(</p>}
            {postForm === 'banned' && <p className="bg-red-800 p-2 rounded-lg">you were banned :(</p>}

            <Heading level={2}>messages :3</Heading>
            {props.posts.length === 0 && <p>no messages :(</p>}
            {props.posts.map((x, i) => {
                return <div className={'bg-[#222] drop-shadow-md rounded-lg p-2 mt-2'} key={i}>
                    <h1 className={'font-bold'}>{x.username} <small className="ml-2 font-normal text-sm text-gray-500">posted on {formatTime(x.created)}</small></h1>
                    <span>{x.body}</span>
                    {x.replies.map((y, j) => {
                        return <div key={j} className={'bg-[#333]  mt-2 rounded-lg p-2 drop-shadow-md'}>
                            <h2 className={'font-bold'}>Lunya UwU </h2>
                            <span>{y}</span>
                        </div>
                    })}
                </div>
            })}

            <Offset amt={4}/>
            <Footer visits={props.visits} route={'/guestbook'} />
        </Content>
    </Main>
}
