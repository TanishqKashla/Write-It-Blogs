import React from 'react'
import Link from 'next/link';

const getData = async () => {
    const res = await fetch("http://localhost:3000/api/categories", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed");
    }

    return res.json();
};

const Category = async () => {

    const data = await getData();

    return (
        <div className='mb-7 '>
            <h3 className='font-medium text-2xl border-b-2 border-black mb-3'>POPULAR CATEGORIES</h3>
            <div className='m-auto '>
                <div className='flex flex-wrap gap-2 uppercase m-auto '>
                    {data?.map((item) => (
                        <Link
                            href={`/category?cat=${item.title}`}
                            key={item.id}
                            className='bg-blue-300 font-bold p-1 px-3 flex justify-center rounded-md w-20'>
                            {item.title}
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Category