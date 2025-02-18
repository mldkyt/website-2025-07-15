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
import {checkKeywordBan} from "@/backend/keywordBlocklist";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress as string;
    if (Array.isArray(ip)) {
        ip = ip[0];
    }

    const {username, body} = req.body as { username: string, body: string };
    if (!username || !body) {
        return res.status(400).json({error: "Missing username or body"});
    }
    if (username.length < 4 || username.length > 32) {
        return res.status(400).json({error: "Invalid username"});
    }
    if (body.length < 4 || body.length > 200) {
        return res.status(400).json({error: "Invalid body"});
    }

    const ipRes = await fetch(`https://freeipapi.com/api/json/${ip}`);
    const ipJson = await ipRes.json();
    const banned = await isCountryBlocked(ipJson.countryCode);
    if (banned) {
        return res.status(403).json({error: `Country banned: ${banned}`});
    }

    const nameCheck = await checkKeywordBan(username);
    if (nameCheck && nameCheck.keyword && nameCheck.violation) {
        return res.status(400).json({error: `Username keyword violation: ${nameCheck.keyword.keyword} is disallowed: ${nameCheck.keyword.reason}`});
    }

    const messageCheck = await checkKeywordBan(body);
    if (messageCheck && messageCheck.keyword && messageCheck.violation) {
        return res.status(400).json({error: `Body keyword violation: ${messageCheck.keyword.keyword} is disallowed: ${messageCheck.keyword.reason}`});
    }

    const prisma = new PrismaClient();
    await prisma.$connect();

    if (await prisma.guestbook.count({where: {IP: ip, Approved: 0}}) > 0) {
        await prisma.$disconnect();
        return res.status(400).json({error: "A post from this network is already awaiting approval."});
    }

    if (await prisma.guestbookBans.count({where: {IP: ip}}) > 0) {
        await prisma.$disconnect();
        return res.status(403).json({error: "Banned"});
    }

    await prisma.guestbook.create({
        data: {
            Username: username,
            Body: body,
            IP: ip
        }
    });
    
    await prisma.$disconnect();

    res.status(200).json({status: "OK"});
}