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
import { z } from 'zod';

const schema = z.object({
    handle: z.string(),
    optionId: z.number(),
    cfToken: z.string()
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            error: parsed.error.message
        });
    }
    const {handle, optionId, cfToken} = parsed.data;
    let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress as string;
    if (Array.isArray(ip)) {
        ip = ip[0];
    }

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
    if (!outcome.success) return res.status(403).json({error: 'Bot detected, exit'});

    const ipRes = await fetch(`https://freeipapi.com/api/json/${ip}`);
    const ipJson = await ipRes.json();
    const banned = await isCountryBlocked(ipJson.countryCode);
    if (banned) {
        return res.status(403).json({error: `Country banned: ${banned}`});
    }

    const prisma = new PrismaClient();
    await prisma.$connect();

    if (await prisma.polls.count({where: {Handle: handle}}) === 0) {
        await prisma.$disconnect();
        return res.status(404).json({error: "Poll not found"});
    }

    if (await prisma.polls.count({where: {Handle: handle, PollVotes: {some: {IP: ip}}}}) > 0) {
        await prisma.$disconnect();
        return res.status(400).json({error: "Already voted"});
    }

    await prisma.polls.update({
        data: {
            PollVotes: {
                create: {
                    OptionID: optionId,
                    IP: ip
                }
            }
        },
        where: {
            Handle: handle
        }
    });

    res.status(200).json({status: "ok"});
}