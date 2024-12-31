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
import postgres from "postgres";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let isOK = true;
    const sql = postgres();

    const a = await sql`select count(*) as cnt
                        from visits`;
    isOK = isOK ? a[0]?.cnt > 0 : false;

    await sql.end();

    res.status(isOK ? 200 : 500).json({status: isOK ? "ok" : "error"});
}
