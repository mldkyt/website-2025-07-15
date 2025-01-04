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
import dbinit from "@/backend/dbinit";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {authorization} = req.headers;
    if (!authorization) {
        return res.status(401).json({error: "Unauthorized"});
    }
    if (authorization !== process.env.ADMIN_PASSWORD) {
        return res.status(403).json({error: "Forbidden"});
    }

    await dbinit();

    const sql = postgres({});

    const pollsRows = await sql`select *
                                from polls
                                order by id desc`;

    const polls = [];

    for (const poll of pollsRows) {
        const optionsRows = await sql`select option,
                                             (select count(*)
                                              from pollVotes
                                              where pollId = ${poll.id}
                                                and optionId = pollOptions.id) as votes
                                      from pollOptions
                                      where pollId = ${poll.id}`;
        const options = optionsRows.map((option) => {
            return {
                id: option.id,
                option: option.option,
                votes: option.votes
            };
        });

        polls.push({
            id: poll.id,
            handle: poll.handle,
            title: poll.title,
            options: options
        });
    }

    res.status(200).json({polls: polls});
}