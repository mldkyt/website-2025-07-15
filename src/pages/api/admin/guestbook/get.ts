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

    await dbinit()

    const sql = postgres({})

    const guestbookEntries = await sql`select id, username, body, ip, approved
                                       from guestbook
                                       where replyto is null;`

    res.status(200).json({
        success: true,
        guestbook: await Promise.all(guestbookEntries.map(async (x) => {
            const reply = await sql`select *
                                    from guestbook
                                    where replyto = ${x.id};`

            return {
                id: x.id,
                username: x.username,
                body: x.body,
                ip: x.ip,
                approved: x.approved === 1,
                replies: reply.map((x) => {
                    return {
                        id: x.id,
                        username: x.username,
                        body: x.body
                    }
                })
            }
        }))
    });
    await sql.end();

}
