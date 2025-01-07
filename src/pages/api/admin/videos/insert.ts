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
    if (req.headers["content-type"] !== "application/json") {
        res.status(400).json({error: "Invalid Content-Type"});
    }

    const {authorization} = req.headers;
    if (!authorization) {
        return res.status(401).json({error: "Unauthorized"});
    }
    if (authorization !== process.env.ADMIN_PASSWORD) {
        return res.status(403).json({error: "Forbidden"});
    }

    const {id, title, description, views, publishedAt, thumbnailURL} = req.body as {
        id: string;
        title: string;
        description: string,
        views: number,
        publishedAt: string;
        thumbnailURL: string;
    };

    if (!id || !title || !description || !views || !publishedAt || !thumbnailURL) {
        return res.status(403).json({error: "No title or description provided"});
    }

    if (title.length < 2 || title.length > 100) {
        return res.status(403).json({error: "Title must be as long as a YouTube title can be"});
    }

    if (description.length > 2000) {
        return res.status(403).json({error: "Description must be as long as a YouTube description can be"});
    }

    if (isNaN(Number(views))) {
        return res.status(403).json({error: "Views must be a number"});
    }

    await dbinit();
    const sql = postgres({});

    await sql`insert into ytvideos (video, title, description, views, published_at, thumb_url)
              values (${id}, ${title}, ${description}, ${views}, ${publishedAt}, ${thumbnailURL})
              on conflict (video) do update
                  set title        = ${title},
                      description  = ${description},
                      views        = ${views},
                      published_at = ${publishedAt},
                      thumb_url    = ${thumbnailURL};`

    await sql.end();

    res.status(200).json({status: "OK"});
}