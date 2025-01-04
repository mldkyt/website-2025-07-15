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

import postgres from "postgres";

export async function countVisit(opts: { route: string }) {
    const sql = postgres();

    await sql`insert into visits (route, count)
              values (${opts.route}, 1)
              on conflict (route) do update set count = visits.count + 1`;

    await sql.end();
}

export async function getVisits(opts: { route: string }) {
    const sql = postgres();

    const result = await sql`select count
                             from visits
                             where route = ${opts.route}`;

    await sql.end();
    return result[0]?.count as number | undefined;
}

export async function getTotalVisits() {
    const sql = postgres();

    const result = await sql`select sum(count) as total
                             from visits`;

    await sql.end();
    return result[0]?.total as number | undefined;
}
