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
import fetch from 'node-fetch';
import Valkey from 'iovalkey';
import {parseISO, formatISO, differenceInHours} from "date-fns";
import { captureException } from '@sentry/nextjs';

type Post = {
    link: string;
    text: string;
    createDate: string;
}

async function fetchPostsFromFedi() {
    const req = await fetch(`https://${process.env.MISSKEY_INSTANCE!}/api/users/notes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Lunya\'s Website/1.0'
        },
        body: JSON.stringify({
            "userId": process.env.MISSKEY_USER_ID!
        })
    });

    if (!req.ok) {
        return [];
    }

    const json = await req.json() as {
        cw: string | null;
        visibility: string;
        renoteId: string | null;
        replyId: string | null;
        text: string;
        createdAt: string;
        id: string;
    }[];

    return json
        .filter(x => x.cw === null)
        .filter(x => x.text !== null && x.text.trim().length > 0)
        .filter(x => x.renoteId === null && x.replyId === null)
        .filter(x => x.visibility === "public")
        .map((x) => ({
            text: x.text,
            link: `https://${process.env.MISSKEY_INSTANCE!}/notes/${x.id}`,
            createDate: x.createdAt
        } as Post));
}

export async function fetchLatestPost() {
    try {
        console.log("fetching post");
        const posts = (await Promise.all([
            fetchPostsFromFedi()
        ])).flat();

        const post = posts
            .sort((a, b) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime())[0];

        return post;
    }
    catch (e) {
        captureException(e);
        return null;
    }
}
