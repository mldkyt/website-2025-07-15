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

       

export async function listBlocks(): Promise<{ code: string, reason: string }[]> {
    const prisma = new PrismaClient();
    await prisma.$connect();
    const res = await prisma.countryBlocklist.findMany();
    await prisma.$disconnect();

    return res.map(x => {
        return {
            code: x.CountryCode,
            reason: x.Reason
        }
    });
}

export async function addBan(country_code: string, reason: string) {
    const prisma = new PrismaClient();
    await prisma.$connect();

    await prisma.countryBlocklist.create({
        data: {
            CountryCode: country_code,
            Reason: reason
        }
    });

    await prisma.$disconnect();
}

export async function removeBan(country_code: string) {
    const prisma = new PrismaClient();
    await prisma.$connect();

    await prisma.countryBlocklist.delete({
        where: {
            CountryCode: country_code
        }
    });

    await prisma.$disconnect();
}

export async function isCountryBlocked(country_code: string): Promise<false | string> {
    const prisma = new PrismaClient();
    await prisma.$connect();
    const res = await prisma.countryBlocklist.findFirst({
        where: {
            CountryCode: country_code
        }
    });
    await prisma.$disconnect();

    if (!res) return false;
    return res.Reason;
}