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

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { DateTime } from 'luxon';
import { z } from 'zod';

import { isCountryBlocked } from '@/backend/country-blocklist';
import { countVisit } from '@/backend/visits-counter';

const prisma = new PrismaClient();

const schema = z.object({
    route: z.string().startsWith('/').min(1),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(400).json({ error: 'Invalid method' });
    }

    let privacyWarning = false;

    const gpcHeader = req.headers['sec-gpc'];

    if (gpcHeader === '1') {
        privacyWarning = true;
    }

    const dntHeader = req.headers['dnt'];

    if (dntHeader === '1') {
        privacyWarning = true;
    }

    if (privacyWarning) {
        return res.status(200).send({ success: true, message: 'Privacy mode active, not counting page view.' });
    }

    let ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || (req.socket.remoteAddress as string);
    if (Array.isArray(ip)) {
        ip = ip[0];
    }

    if (ip.includes(',')) {
        ip = ip.split(',')[0];
    }

    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            error: parsed.error.message,
        });
    }
    const { route } = parsed.data;

    await prisma.pageVisitCooldown.deleteMany({
        where: {
            expires: {
                lt: DateTime.now().toJSDate(),
            },
        },
    });

    if (
        await prisma.pageVisitCooldown.count({
            where: {
                ip,
                route,
            },
        })
    ) {
        return res.status(429).send({ error: 'Too many requests, try again later.' });
    }

    await prisma.pageVisitCooldown.create({
        data: {
            ip,
            expires: DateTime.now().plus({ seconds: 10 }).toJSDate(),
            route,
        },
    });

    const ipRes = await fetch(`https://freeipapi.com/api/json/${ip}`);
    const json = await ipRes.json();
    if (await isCountryBlocked(json.countryCode)) {
        res.status(200).json({ success: true });
        return;
    }

    await countVisit({ route });

    res.status(200).json({ success: true });
}
