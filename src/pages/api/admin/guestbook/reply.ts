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

    const ip = '0.0.0.0';

    const {body, replyTo} = req.body as { body: string, replyTo: string };
    if (!body) {
        return res.status(400).json({error: "Missing username or body"});
    }
    if (body.length < 4 || body.length > 200) {
        return res.status(400).json({error: "Invalid body"});
    }
    if (isNaN(Number(replyTo))) {
        return res.status(400).json({error: "Invalid replyTo"});
    }

    const prisma = new PrismaClient();
    await prisma.$connect();

    if (await prisma.guestbook.count({where: {ReplyTo: Number(replyTo)}}) === 0) {
        return res.status(400).json({error: "ReplyTo post not found"});
    }

    const res1 = await prisma.guestbook.create({
        data: {
            Username: "mldchan",
            Body: body,
            IP: ip,
            ReplyTo: Number(replyTo)
        }
    });

    await prisma.$disconnect();

    res.status(200).json({status: "OK", replyId: res1.ID});
}