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

import { PrismaClient } from '@prisma/client';

export async function listBlockedKeywords(): Promise<{ keyword: string; reason: string }[]> {
    const prisma = new PrismaClient();
    await prisma.$connect();
    const keywords = await prisma.keywordBlocklist.findMany();
    await prisma.$disconnect();

    return keywords.map((x) => {
        return {
            keyword: x.Keyword,
            reason: x.Reason,
        };
    });
}

export async function addBan(keyword: string, reason: string) {
    const prisma = new PrismaClient();
    await prisma.$connect();

    await prisma.keywordBlocklist.create({
        data: {
            Keyword: keyword,
            Reason: reason,
        },
    });

    await prisma.$disconnect();
}

export async function removeKeywordBan(keyword: string) {
    const prisma = new PrismaClient();
    await prisma.$connect();

    await prisma.keywordBlocklist.delete({
        where: {
            Keyword: keyword,
        },
    });

    await prisma.$disconnect();
}

export async function checkKeywordBan(text: string) {
    const keywords = await listBlockedKeywords();

    for (const word of text.split(' ')) {
        for (const keyword of keywords) {
            if (word.includes(keyword.keyword)) {
                return {
                    violation: true,
                    keyword,
                };
            }
        }
    }

    return {
        violation: false,
    };
}
