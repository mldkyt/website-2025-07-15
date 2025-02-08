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
    let {handle, optionId, cfToken} = req.body as { handle: string, optionId: number, cfToken: string };
    let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress as string;
    if (Array.isArray(ip)) {
        ip = ip[0];
    }

    if (!handle || !optionId) {
        return res.status(400).json({error: "Missing handle or optionId"});
    }

    if (isNaN(Number(optionId))) {
        return res.status(400).json({error: "Bad Request"});
    }

    let formData = new FormData();
    formData.append("secret", process.env['CLOUDFLARE_SECRET_TOKEN']!);
    formData.append("response", cfToken);
    formData.append("remoteip", ip);

    const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    const result = await fetch(url, {
        body: formData,
        method: "POST",
    });

    const outcome = await result.json();
    if (!outcome.success) res.status(403).json({error: 'Bot detected, exit'});

    await dbinit();

    const sql = postgres({});

    const dbExistingResult = await sql`select id
                                       from polls
                                       where handle = ${handle}`;

    if (dbExistingResult.length === 0) {
        await sql.end();
        return res.status(404).json({error: "Poll not found"});
    }

    const dbExistingIP = await sql`select *
                                   from pollvotes
                                   where pollid = ${dbExistingResult[0].id}
                                     and ip = ${ip}`;

    if (dbExistingIP.length > 0) {
        await sql.end();
        return res.status(400).json({error: "Already voted"});
    }

    await sql`insert into pollvotes (pollid, optionid, ip)
              values ((select id
                       from polls
                       where handle = ${handle}),
                      ${optionId}, ${ip})`;

    res.status(200).json({status: "ok"});
}