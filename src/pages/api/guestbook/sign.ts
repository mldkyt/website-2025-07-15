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
    let ip = req.headers["x-real-ip"] || req.socket.remoteAddress as string;
    if (Array.isArray(ip)) {
        ip = ip[0];
    }

    const {username, body} = req.body as { username: string, body: string };
    if (!username || !body) {
        return res.status(400).json({error: "Missing username or body"});
    }
    if (username.length < 4 || username.length > 32) {
        return res.status(400).json({error: "Invalid username"});
    }
    if (body.length < 4 || body.length > 200) {
        return res.status(400).json({error: "Invalid body"});
    }

    await dbinit();

    const sql = postgres({});

    const existingTest = await sql`select id
                                   from guestbook
                                   where ip = ${ip}
                                     and approved = 0;`;
    if (existingTest.length > 0) {
        await sql.end();
        return res.status(400).json({error: "A post from this network is already awaiting approval."});
    }

    const banCheck = await sql`select id
                               from guestbookbans
                               where ip = ${ip};`;
    if (banCheck.length > 0) {
        await sql.end();
        return res.status(400).json({error: "Banned"});
    }

    await sql`insert into guestbook (username, body, ip)
              values (${username}, ${body}, ${ip});`
    await sql.end();

    res.status(200).json({status: "OK"});
}