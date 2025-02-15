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

export async function countVisit(opts: { route: string }) {

    const prisma = new PrismaClient();
    await prisma.$connect();

    await prisma.visits.upsert({
        create: {
            Route: opts.route,
            Count: 1
        },
        update: {
            Count: {
                increment: 1
            }
        },
        where: {
            Route: opts.route
        }
    });

    await prisma.$disconnect();
}

export async function getVisits(opts: { route: string }) {
    const prisma = new PrismaClient();
    await prisma.$connect();

    const result = await prisma.visits.findFirst({
        where: {
            Route: opts.route
        }
    });

    await prisma.$disconnect();
    return result?.Count as number | undefined;
}

export async function getTotalVisits() {
    const prisma = new PrismaClient();
    await prisma.$connect();

    const data = await prisma.visits.aggregate({
        _sum: {
            Count: true
        }
    });

    await prisma.$disconnect();

    return data._sum.Count as number | undefined;
}
