// import React from 'react'
// import Link from 'next/link';
// import Image from 'next/image';
// import { FaEraser } from 'react-icons/fa';

// const getFeatued = async (cat) => {
//     const res = await fetch(
//         `http://localhost:3000/api/featured`,
//         {
//             cache: "no-store",
//         }
//     );

//     if (!res.ok) {
//         throw new Error("Failed");
//     }

//     return res.json();
// };


// const Featured = async () => {

//     let featured;
//     try {
//         featured = await getFeatued();
//     } catch (error) {
//         console.error("Error fetching data:", error);
//         data = { content: "<p>Failed to load content</p>" };
//     }



//     return (
//         <div className='lg:h-[70vh] md:h-[58vh] sm:h-[40vh]   flex flex-col py-[18px] md:p-[40px] mb-5 sm:mb-10 items-start justify-between gap-3'>
//             <h2 className='text-3xl md:text-4xl font-medium'>FEATURED</h2>
//             {featured.map((item) => (
//                 <Link key={item.id} href={`/view/${item.slug}`} className=' mx-3 lg:mx-[5%] h-[100%]'>
//                     <div className='h-[100%] w-fit flex flex-col sm:flex sm:flex-row gap-1 sm:gap-[40px] ' key={item._id}>

//                         <div className="relative z-[3] w-[100%] aspect-[4/3] dm:w-[40%] sm:h-[100%]  overflow-hidden rounded-3 ">
//                             <Image className='rounded-md' src={item.img} alt={item.title} width={600} height={600} style={{ objectFit: 'cover', width: "100%", height: "100%" }} />
//                         </div>


//                         <div className='sm:py-[8px] flex flex-col sm:w-[60%]'>
//                             <div className='sm:mb-2'>
//                                 <div className='text-xs sm:text-md md:text-lg'>
//                                     <h2 className='inline-block font-[800] text-blue-500 uppercase'>{item.catSlug}</h2>
//                                     <p className='inline-block text-blue-500 mx-2'>•</p>
//                                     <h2 className='inline-block font-[800] text-blue-500'>{item.createdAt.substring(0, 10)}</h2>
//                                 </div>
//                                 <div className='md:text-4xl lg:text-5xl lg:leading-[56px] sm:mt-2  font-bold text-2xl' dangerouslySetInnerHTML={{ __html: item?.title }} />
//                                 <p className='text-sm md:text-base' dangerouslySetInnerHTML={{ __html: item.content.substring(0, 150) + "..." }} />
//                             </div>
//                             <div className='text-[15px] md:text-lg text-gray-700'>

//                                 <p className='group-hover:text-blue-700'>
//                                     By : {item.userEmail}
//                                 </p>
//                             </div>

//                         </div>

//                     </div>
//                 </Link>
//             ))}
//         </div>
//     )
// }

// export default Featured
'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaEraser } from 'react-icons/fa';

const getFeatured = async () => {
    const res = await fetch(`http://localhost:3000/api/featured`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
};

const Featured = () => {
    const [featured, setFeatured] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getFeatured();
                setFeatured(data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load content");
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='lg:h-[70vh] md:h-[58vh] sm:h-[40vh] flex flex-col py-[18px] md:p-[40px] mb-5 sm:mb-10 items-start justify-between gap-3'>
            <h2 className='text-3xl md:text-4xl font-medium'>FEATURED</h2>

            {featured.map((item, index) => (
                <Link key={item.id} href={`/view/${item.slug}`} className='mx-3 lg:mx-[5%] h-[100%]'>
                    <div className='h-[100%] w-fit flex flex-col sm:flex sm:flex-row gap-1 sm:gap-[40px]' key={item._id}>
                        <div className="relative z-[3] w-[100%] aspect-[4/3] dm:w-[40%] sm:h-[100%] overflow-hidden rounded-3">
                            <Image className='rounded-md' src={item.img} alt={item.title} width={600} height={600} style={{ objectFit: 'cover', width: "100%", height: "100%" }} priority={index === 0} />
                        </div>
                        <div className='sm:py-[8px] flex flex-col sm:w-[60%]'>
                            <div className='sm:mb-2'>
                                <div className='text-xs sm:text-md md:text-lg'>
                                    <h2 className='inline-block font-[800] text-blue-500 uppercase'>{item.catSlug}</h2>
                                    <p className='inline-block text-blue-500 mx-2'>•</p>
                                    <h2 className='inline-block font-[800] text-blue-500'>{item.createdAt.substring(0, 10)}</h2>
                                </div>
                                <div className='md:text-4xl lg:text-5xl lg:leading-[56px] sm:mt-2 font-bold text-2xl' dangerouslySetInnerHTML={{ __html: item?.title }} />
                                <p className='text-sm md:text-base' dangerouslySetInnerHTML={{ __html: item.content.substring(0, 150) + "..." }} />
                            </div>
                            <div className='text-[15px] md:text-lg text-gray-700'>
                                <p className='group-hover:text-blue-700 font-bold'>By: {item.userEmail}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Featured;
