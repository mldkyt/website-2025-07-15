import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({error: "Unauthorized"});
    }

    if (authorization !== process.env.ADMIN_PASSWORD) {
        return res.status(403).json({error: "Forbidden"});
    }

    const prisma = new PrismaClient();
    await prisma.$connect();

    const anonMessages = await prisma.anonymousMessages.findMany();

    res.status(200).json(anonMessages.map(x => ({
        id: x.ID,
        message: x.Message,
        cw: x.CW || undefined
    })));
}