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
import { z } from 'zod';
import {PrismaClient} from "@prisma/client";

// We receive a schema like this from the Ai bot
const schema = z.object({
    code: z.string().min(16).max(16),
    totalMessages: z.number(),
    meows: z.number(),
    catfaces: z.number(),
    activity: z.array(z.object({
        messageCount: z.number(),
        date: z.string().date()
    })).length(3)
})

const prisma = new PrismaClient();

async function setKV(key: string, value: string) {
    await prisma.discordKV.upsert({
        where: {key},
        update: {value},
        create: {key, value}
    });
}

async function setPastActivity(data: {
    date:string,
    messageCount: number
}[]) {
    // Clear old data
    await prisma.discordHistory.deleteMany({});

    // Insert the 3 new records
    await prisma.discordHistory.createMany({
        data
    });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(400).send("Method not allowed");
    if (!req.headers['content-type']?.startsWith("application/json")) return res.status(400).send("Invalid content-type");

    const data = schema.parse(req.body);

    // Authorize the request against the local token
    if (data.code !== process.env.BOT_TOKEN) return res.status(400).send("Invalid code");

    // Set main parameters
    await Promise.all([
        setKV("totalMessages", data.totalMessages.toString()),
        setKV("meows", data.meows.toString()),
        setKV("catfaces", data.catfaces.toString()),
        setPastActivity(data.activity)
    ]);

    res.status(200).send("OK");
}
