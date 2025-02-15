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
import {MeiliSearch} from "meilisearch";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const {q} = req.query;
    if (!q || q === '' || Array.isArray(q)) {
        res.status(400).json({"error": "Bad parameters"});
    }

    const meili = new MeiliSearch({
        host: 'http://192.168.88.27:7700',
        apiKey: process.env.MEILI_API_KEY!
    });

    try {
        const x = await meili.index('nekoweb').search(q as string, {
            limit: 20,
            cropLength: 20,
            attributesToCrop: ['body']
        });

        const data = {
            time: x.processingTimeMs,
            est: x.estimatedTotalHits,
            hits: x.hits.map(y => {
                return {
                    title: y.title,
                    body: y._formatted?.body ?? y.body,
                    url: y.url
                }
            })
        };

        res.json(data);
    } catch {
        res.status(400).json({"error": "Error occured"});
    }
}
