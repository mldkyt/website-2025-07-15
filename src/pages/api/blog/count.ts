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
import {isCountryBlocked} from "@/backend/countryBlocklist";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.headers['content-type'] !== "application/json") res.status(400).json({error: 'Invalid content-type'});
    if (req.method !== 'POST') res.status(400).json({error: 'Invalid method'});

    let privacyWarning = false;

    const gpcHeader = req.headers['sec-gpc'];

    if (gpcHeader === "1") {
        privacyWarning = true;
    }

    const dntHeader = req.headers['dnt'];

    if (dntHeader === "1") {
        privacyWarning = true;
    }

    let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress as string;
    if (Array.isArray(ip)) {
        ip = ip[0];
    }

    const {cfToken, blogPost} = req.body;

    const formData = new FormData();
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

    const prisma = new PrismaClient();
    await prisma.$connect();

    const ipRes = await fetch(`https://freeipapi.com/api/json/${ip}`);
    const ipJson = await ipRes.json();
    const banned = await isCountryBlocked(ipJson.countryCode) || privacyWarning;
    if (banned) {
        const result3 = await prisma.blogposts.findFirst({
            where: {
                handle: blogPost
            }
        });

        if (!result3) {
            res.status(404).json({error: 'No such blog post'});
            return;
        }

        res.status(200).json({success: true, url: result3.targeturl});
        return;
    }

    const blogPost2 = await prisma.blogposts.findFirst({
        where: {
            handle: blogPost
        }
    });

    if (!blogPost2) {
        res.status(404).json({error: 'No such blog post'});
        return;
    }

    await prisma.blogposts.update({
        where: {
            handle: blogPost
        },
        data: {
            views: {
                increment: 1
            }
        }
    });

    await prisma.$disconnect();

    res.status(200).json({success: true, url: blogPost2.targeturl});
}
