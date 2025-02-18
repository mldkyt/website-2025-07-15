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

import { NextApiRequest, NextApiResponse } from "next";
import { addBan } from "@/backend/countryBlocklist";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
    if (req.headers["content-type"] !== "application/json") return res.status(400).json({ error: "Invalid content-type" });

    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    if (authorization !== process.env.ADMIN_PASSWORD) {
        return res.status(403).json({ error: "Forbidden" });
    }

    const { code, reason } = req.body;
    if (!code || !reason) return res.status(400).json({ error: "Parameters not provided" });

    await addBan(code, reason);

    res.status(200).json({ success: true });
}
