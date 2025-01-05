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

import {NextApiRequest, NextApiResponse} from "next";
import dbinit from "@/backend/dbinit";
import postgres from "postgres";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {authorization} = req.headers;
    if (!authorization) {
        return res.status(401).json({error: "Unauthorized"});
    }
    if (authorization !== process.env.ADMIN_PASSWORD) {
        return res.status(403).json({error: "Forbidden"});
    }

    let ip = '0.0.0.0';

    const {body, replyTo} = req.body as { body: string, replyTo: string };
    if (!body) {
        return res.status(400).json({error: "Missing username or body"});
    }
    if (body.length < 4 || body.length > 200) {
        return res.status(400).json({error: "Invalid body"});
    }
    if (isNaN(Number(replyTo))) {
        return res.status(400).json({error: "Invalid replyTo"});
    }

    await dbinit();

    const sql = postgres({});

    const existingReplyToPost = await sql`select *
                                          from guestbook
                                          where id = ${replyTo};`
    if (existingReplyToPost.length === 0) {
        return res.status(404).json({error: "ReplyTo post not found"});
    }

    await sql`insert into guestbook (username, body, ip, replyto)
              values ('mldchan', ${body}, ${ip}, ${replyTo});`
    await sql.end();

    res.status(200).json({status: "OK"});
}