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
        .filter(x => x.renoteId === null && x.replyId === null)
        .filter(x => x.visibility === "public")
        .map((x) => ({
            text: x.text,
            link: `https://${process.env.MISSKEY_INSTANCE!}/notes/${x.id}`,
            createDate: x.createdAt
        } as Post));
}

export async function fetchLatestPost() {
    // valkey connection
    const valkey = new Valkey(
        Number(process.env.VALKEY_PORT ?? "6379"),
        process.env.VALKEY_HOST ?? "localhost"
    );

    await valkey.del("lastPostFetchDate", "lastPostText", "lastPostLink", "lastPostCreateDate");
    console.log("getting latest post");
    if (await valkey.exists("lastPostFetchDate", "lastPostText", "lastPostLink", "lastPostCreateDate")) {
        console.log("cache exists");
        const data = await Promise.all([
            valkey.get("lastPostFetchDate"),
            valkey.get("lastPostText"),
            valkey.get("lastPostLink"),
            valkey.get("lastPostCreateDate")
        ]);

        if (differenceInHours(new Date(), parseISO(data[0] ?? "2025-01-01")) >= 1) {
            console.log("cache expired");
            await valkey.del("lastPostFetchDate", "lastPostText", "lastPostLink", "lastPostCreateDate");
            return await fetchLatestPost();
        }

        return {
            text: data[1],
            link: data[2],
            createDate: data[3]
        } as Post;
    }

    console.log("fetching post");
    const posts = (await Promise.all([
        fetchPostsFromFedi()
        // TODO: more post sources
    ])).flat();

    const post = posts
        .sort((a, b) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime())[0];

    console.log("writing cache data");
    await Promise.all([
        valkey.set("lastPostFetchDate", formatISO(new Date())),
        valkey.set("lastPostText", post.text),
        valkey.set("lastPostLink", post.link),
        valkey.set("lastPostCreateDate", post.createDate),
    ])

    return post;
}
