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

    const {guestbookId} = req.body as { guestbookId: string };
    if (!guestbookId) {
        return res.status(400).json({error: "Guestbook ID is required"});
    }
    if (isNaN(Number(guestbookId))) {
        return res.status(400).json({error: "Guestbook ID is invalid"});
    }

    await dbinit()

    const sql = postgres({})

    await sql`delete
              from guestbook
              where id = ${Number(guestbookId)}
                and approved = 1;`

    await sql.end();

    res.status(200).json({success: true});
}