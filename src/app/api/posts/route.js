
import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";



export const GET = async (req) => {
    const { searchParams } = new URL(req.url);

    const cat = searchParams.get("cat");
    const email = searchParams.get("email");

    const query = {
        where: {
            ...(cat && { catSlug: cat }),
            ...(email && { userEmail: email }),
            catSlug: { not: "dev" }
        }
    };

    try {

        const posts = await prisma.post.findMany(query);

        return new NextResponse(JSON.stringify(posts, { status: 200 }));
    } catch (err) {
        console.log(err);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
        );
    }
};










// CREATE A POST
export const POST = async (req) => {
    const session = await getAuthSession();

    if (!session) {
        return new NextResponse(
            JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
        );
    }

    try {
        const body = await req.json();
        const post = await prisma.post.create({
            data: { ...body, userEmail: session.user.email },
        });

        return new NextResponse(JSON.stringify(post, { status: 200 }));
    } catch (err) {
        console.log(err);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
        );
    }
};








export const DELETE = async (req) => {
    try {
        const id = req.nextUrl.searchParams.get('id');
        console.log("THIS IS THE POST TO BE DELETED:", id);
        const deletedPost = await prisma.post.delete({
            where: {
                id: id,
            },
        });
        return NextResponse.json({ message: "Blog deleted successfully" })
    } catch (error) {
        console.log(error);
    }

}