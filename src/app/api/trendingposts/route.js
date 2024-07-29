import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        const topPosts = await prisma.post.findMany({
            orderBy: {
                views: 'desc',
            },
            where: {
                catSlug: { not: "dev" }
            },
            take: 5,
        });

        return new NextResponse(JSON.stringify(topPosts), { status: 200 });
    } catch (err) {
        console.log(err);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" }),
            { status: 500 }
        );
    }
};