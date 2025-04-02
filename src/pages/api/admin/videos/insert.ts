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

import { PrismaClient } from "@prisma/client";
import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

    const prisma = new PrismaClient();
    await prisma.$connect();

    await prisma.youTubeVideos.upsert({
        where: {
            VideoID: id
        },
        update: {
            Title: title,
            Description: description,
            Views: views,
            PublishedAt: publishedAt,
            ThumbURL: thumbnailURL
        },
        create: {
            VideoID: id,
            Title: title,
            Description: description,
            Views: views,
            PublishedAt: publishedAt,
            ThumbURL: thumbnailURL
        }
    });
    
    await prisma.$disconnect();

    res.status(200).json({status: "OK"});
}