import React from 'react'
import Link from 'next/link';


const getData = async () => {
    const res = await fetch(
        `api/trendingposts`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Failed");
    }

    return res.json();
};

const Trending = async () => {

    const data = await getData()

    return (
        <div className='hidden sm:block'>
            <h3 className='font-medium text-2xl uppercase border-b-2 border-black mb-3'>Trending Blogs</h3>
            {data.map((post, index) => (
                <Link key={post.id} href={`/view/${post.slug}`}>
                    <div key={post.id} className=' flex mb-3 bg-gray-300 p-2 rounded-md'>
                        <div className='w-[10%] font-extrabold text-xl text-blue-500 flex items-end '>

                            <h4>#{index + 1}</h4>
                        </div>
                        <div className=' ml-3'>
                            <h4 className='font-bold'>{post.title}</h4>
                            <p className='text-xs'>By: {post.userEmail}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Trending