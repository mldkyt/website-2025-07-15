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

    const { id, reason } = req.body as {
        id: number,
        reason: string
    };

    const prisma = new PrismaClient();
    await prisma.$connect();

    if (await prisma.anonymousMessages.count({where: {ID: Number(id)}}) === 0) {
        await prisma.$disconnect();
        return res.status(400).json({error: "Message not found"});
    }

    const message = await prisma.anonymousMessages.findUniqueOrThrow({where: {ID: Number(id)}});

    await prisma.anonymousMessagesBans.create({
        data: {
            IP: message.IP,
            Reason: reason
        }
    });

    await prisma.anonymousMessages.delete({where: {ID: Number(id)}});
    await prisma.$disconnect();

    res.status(200).json({status: 'ok'});
}