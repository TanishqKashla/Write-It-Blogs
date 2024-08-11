import Image from "next/image";
import Link from "next/link";
import RemoveBtn from '@/components/RemoveBtn';
import { MdOutlineModeEdit } from "react-icons/md";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { IoMdEye } from "react-icons/io";
// import Comments from "@/components/comments/Comments";

const getData = async (slug) => {
    const res = await fetch(`/api/posts/${slug}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed");
    }

    return res.json();
};

const SinglePage = async ({ params }) => {

    const session = await getServerSession(authOptions)

    const { slug } = params;
    let data;
    try {
        data = await getData(slug);
    } catch (error) {
        console.error("Error fetching data:", error);
        data = { content: "<p>Failed to load content</p>" };
    }

    return (
        <div className="flex flex-col sm:px-[10%] lg:px-[13%] xl:px-[16%] mt-20 md:mt-10">

            <div className="flex flex-col lg:flex-row justify-between gap-2 ">
                <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:w-[60%] text-center md:text-start ">
                    {data?.title}
                </h1>

                {data?.img && (
                    <div className="relative w-[100%] aspect-[4/3] lg:h-[330px] lg:w-[360px] rounded-md overflow-hidden">
                        <Image src={data.img} alt={data?.title} height={500} width={500} style={{ objectFit: "cover", height: "100%", width: "100%" }} />
                    </div>
                )}

            </div>
            <div className="flex gap-5 items-center py-2 my-3 border-gray-300 border-b-2 border-t-2">

                <div className="h-[40px] sm:h-[65px] aspect-square">
                    {data?.user?.image && (
                        <div className="rounded-full overflow-hidden">
                            <Image height={100} width={100} quality={100} style={{ objectFit: "cover", height: "100%", width: "100%" }} src={data.user.image} alt="user pfp" />
                        </div>
                    )}
                </div>

                <div >
                    <span className="font-bold ">
                        {data?.user.name}
                    </span>
                    <div className="text-gray-700">
                        <Link className="text-sm group text-blue-500" href={`user/${data.userEmail}`}>
                            <h2 className="group-hover:text-blue-700" >
                                {data.userEmail}
                            </h2>
                        </Link>

                        {data.catSlug === "dev" ? ("") : (

                            <span className="text-xs">
                                Published in
                                <span className="uppercase font-bold">
                                    <span className="group text-blue-500">
                                        <Link href={`/category?cat=${data.catSlug}`} className="group-hover:text-blue-700 mx-1">
                                            {data.catSlug}
                                        </Link>
                                    </span>
                                    <span>•</span>
                                    {data.createdAt.substring(0, 10)}
                                </span>
                            </span>
                        )}

                        <div className="sm:mt-2 text-sm flex items-center gap-2">
                            <IoMdEye size={15} color="#b1b1b1" /> {data.views}
                        </div>
                    </div>
                </div>
            </div>
            <div className="pb-40">

                <div>
                    <div
                        className="text-base sm:text-xl"
                        dangerouslySetInnerHTML={{ __html: data?.content }}
                    />

                </div>


                {/* tooltip */}
                {(session?.user.email === data.userEmail || session?.user.email === "tanishqkashla11@gmail.com") &&
                    <div className="absolute md:fixed top-[100px] right-[20px] flex md:flex-col gap-[20px]" key={slug}>
                        <Link href={`/editblog/${slug}`} className='flex justify-center items-center bg-white p-[20px] rounded-full shadow-[0_3px_5px_0_rgba(0,0,0,0.3),0_3px_5px_0_rgba(0,0,0,0.3)]'>
                            <MdOutlineModeEdit color='black' size={20} />
                        </Link>
                        <RemoveBtn id={data.id} />
                    </div>
                }

            </div>
        </div >
    );
};

export default SinglePage;