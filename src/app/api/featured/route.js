import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {

    try {

        const latestPost = await prisma.post.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            where: {
                catSlug: { not: "dev" }
            },
            take: 1,
        });

        return new NextResponse(JSON.stringify(latestPost, { status: 200 }));
    } catch (err) {
        console.log(err);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
        );
    }
};