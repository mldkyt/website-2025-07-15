import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    if (authorization !== process.env.ADMIN_PASSWORD) {
        return res.status(403).json({ error: "Forbidden" });
    }

    const { id, reply } = req.body as {
        id: number;
        reply: string;
    };

    if (id === undefined) {
        return res.status(400).json({ error: "ID is required" });
    }

    if (isNaN(Number(id))) {
        return res.status(400).json({ error: "ID is not a number" });
    }

    if (!reply) {
        return res.status(400).json({ error: "Reply is required" });
    }

    const prisma = new PrismaClient();
    await prisma.$connect();

    if ((await prisma.anonymousMessages.count({ where: { ID: Number(id) } })) === 0) {
        await prisma.$disconnect();
        return res.status(400).json({ error: "Message not found" });
    }

    const message = await prisma.anonymousMessages.findUnique({ where: { ID: Number(id) } });

    if (!message) {
        await prisma.$disconnect();
        return res.status(400).json({ error: "Message not found" });
    }

    let devPrefix = "";
    if (process.env.NODE_ENV === "development") {
        devPrefix = "DEV/TEST: ";
    }

    await fetch(`https://${process.env.MISSKEY_INSTANCE!}/api/notes/create`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.MISSKEY_TOKEN!}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text: `> ${message.Message}\n\n${reply}`,
            cw: `${devPrefix}Anon message reply${message.CW ? `, ${message.CW}` : ""}`,
        }),
    });

    await prisma.anonymousMessages.delete({ where: { ID: Number(id) } });

    await prisma.$disconnect();

    res.status(200).json({ status: "ok" });
}
