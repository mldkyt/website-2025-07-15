import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from 'zod';


const schema = z.object({
    message: z.string().min(1).max(1000),
    cw: z.string().min(1).max(100).optional()
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({error: 'Method not allowed'});
    }

    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if (Array.isArray(ip)) {
        ip = ip[0];
    }

    if (!ip) {
        return res.status(500).json({error: 'IP is unknown'});
    }
    
    const {message, cw} = schema.parse(req.body);

    const prisma = new PrismaClient();
    await prisma.$connect();

    const ban = await prisma.anonymousMessagesBans.findFirst({where: {IP: ip}});

    if (ban) {
        await prisma.$disconnect();
        return res.status(403).send({error: `Banned: ${ban.Reason}`});
    }

    if (await prisma.anonymousMessages.count({where: {IP: ip}}) > 0) {
        await prisma.$disconnect();
        return res.status(400).json({error: 'You have already sent a message which wasn\'t looked at, please try again later.'});
    }

    await prisma.anonymousMessages.create({
        data: {
            Message: message,
            CW: cw,
            IP: ip
        }
    });

    await prisma.$disconnect();

    return res.status(200).json({success: true});
}