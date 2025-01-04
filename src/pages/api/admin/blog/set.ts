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
import dbinit from "@/backend/dbinit";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({error: "Unauthorized"});
    }

    if (authorization !== process.env.ADMIN_PASSWORD) {
        return res.status(403).json({error: "Forbidden"});
    }

    const {postID, newHandle, newTitle, newDescription, newTargetURL} = req.body;

    if (!postID || !newHandle || !newTitle || !newDescription || !newTargetURL) {
        return res.status(400).json({error: "Bad Request"});
    }

    if (!(typeof postID === "number" && typeof newHandle === "string" && typeof newTitle === "string" && typeof newDescription === "string" && typeof newTargetURL === "string")) {
        return res.status(400).json({error: "Bad Request"});
    }

    await dbinit();

    const sql = postgres({});

    await sql`create table if not exists blogPosts
              (
                  id          serial primary key,
                  handle      text    not null unique,
                  title       text    not null,
                  description text    not null,
                  created     timestamp        default now(),
                  updated     timestamp        default now(),
                  targetURL   text    not null,
                  views       integer not null default 0
              );`

    await sql`update blogPosts
              set title       = ${newTitle},
                  handle      = ${newHandle},
                  description = ${newDescription},
                  targetURL   = ${newTargetURL},
                  updated     = now()
              where id = ${postID}`;

    await sql.end();

    res.status(200).json({status: "ok"});
}