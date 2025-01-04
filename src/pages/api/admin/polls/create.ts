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
import postgres from "postgres";
import dbInit from '@/backend/dbinit';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {title, handle, options} = req.body as { title: string, handle: string, options: string[] };

    if (!title || !handle) {
        return res.status(400).json({error: "Bad Request"});
    }

    if (!Array.isArray(options) || !options.length) {
        return res.status(400).json({error: "Bad Request"});
    }

    if (options.length < 2) {
        return res.status(400).json({error: "Bad Request"});
    }

    const {authorization} = req.headers;

    if (!authorization) {
        return res.status(401).json({error: "Unauthorized"});
    }

    if (authorization !== process.env.ADMIN_PASSWORD) {
        return res.status(403).json({error: "Forbidden"});
    }

    await dbInit();

    const sql = postgres({});

    const poll = await sql`insert into polls (title, handle)
                           values (${title}, ${handle})
                           returning id`;

    for (const option of options) {
        await sql`insert into pollOptions (pollID, option)
                  values (${poll[0].id}, ${option})`;
    }

    await sql.end();

    res.status(200).json({status: "ok", pollID: poll[0].id});

}