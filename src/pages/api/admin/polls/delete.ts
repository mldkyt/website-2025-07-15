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

    const {handle} = req.body;

    if (!handle) {
        return res.status(400).json({error: "Missing handle"});
    }

    const {authorization} = req.headers;
    if (!authorization) {
        return res.status(401).json({error: "Unauthorized"});
    }
    if (authorization !== process.env.ADMIN_PASSWORD) {
        return res.status(403).json({error: "Forbidden"});
    }

    await dbinit();

    const sql = postgres({});

    const dbRow = await sql`select id
                            from polls
                            where handle = ${handle}`;

    if (dbRow.length === 0) {
        await sql.end();
        return res.status(404).json({error: "Poll not found"});
    }

    const pollID = dbRow[0].id as number;

    await sql`delete
              from pollvotes
              where pollid = ${pollID}`;

    await sql`delete
              from polloptions
              where pollid = ${pollID}`;

    await sql`delete
              from polls
              where id = ${pollID}`;

    await sql.end();

    res.status(200).json({status: "ok"});

}