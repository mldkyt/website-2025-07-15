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
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({error: "Unauthorized"});
    }

    if (authorization !== process.env.ADMIN_PASSWORD) {
        return res.status(403).json({error: "Forbidden"});
    }

    const prisma = new PrismaClient();
    await prisma.$connect();

    // const posts = await sql`select *
    //                         from blogPosts
    //                         order by created desc`;

    const blogPosts = await prisma.blogposts.findMany({
        orderBy: {
            created: "desc"
        }
    });

    await prisma.$disconnect();

    res.status(200).json({
        blogPosts: blogPosts.map((post) => {
            return {
                id: post.id,
                title: post.title,
                handle: post.handle,
                description: post.description,
                created: post.created,
                updated: post.updated,
                targetURL: post.targeturl,
                views: post.views
            }
        })
    });
}