// import React from 'react'
// import Link from 'next/link'
// import Image from 'next/image';
// import { IoMdEye } from "react-icons/io";

// const getData = async (cat, email) => {
//   const res = await fetch(
//     `http://localhost:3000/api/posts?cat=${cat || ""}&email=${email || ""}`,
//     {

//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed");
//   }

//   return res.json();
// };


// //

// const AllBlogs = async ({ cat, email }) => {

//   let data;
//   try {
//     data = await getData(cat, email);
//     console.log(data)
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     data = { content: "<p>Failed to load content</p>" };
//   }

//   return (

//     <div className='flex flex-col bg-yellow p-auto '>
//       <h2 className='font-medium text-2xl md:text-4xl border-b-2 border-black mb-6'>LATEST BLOGS</h2>
//       <div className='flex flex-wrap gap-7  '>
//         {data.reverse().map((item) => (
//           <Link key={item.id} href={`/view/${item.slug}`} className='w-[100%] sm:w-auto sm:h-[270px]'>
//             <div className=' rounded-[5px] h-[110px] w-[100%] sm:w-[240px] sm:h-[100%] overflow-hidden flex gap-2 sm:flex-col z-[5] ' key={item.id}>

//               <div className="relative z-[3]  sm:h-[58%] w-[40%] sm:w-[100%] overflow-hidden rounded-3 ">
//                 <Image className='rounded-md' src={item.img} alt={item.title} width={450} height={450} style={{ objectFit: 'cover', width: "100%", height: "100%" }} />
//               </div>


//               <div className=' sm:h-[40%] sm:py-[4px] w-[60%] sm:w-[100%] flex flex-col '>
//                 <div className='sm:mb-1'>

//                   <div>
//                     <p className='inline-block text-xs sm:font-[800] text-blue-500 uppercase'>{item.catSlug}</p>
//                     <p className='inline-block text-blue-500 mx-1'>•</p>
//                     <p className='inline-block text-xs sm:font-[800] text-blue-500'>{item.createdAt.substring(0, 10)}</p>
//                   </div>
//                   <div className='leading-[18px] sm:leading-[20px] font-bold text-base sm:text-base' dangerouslySetInnerHTML={{ __html: item?.title.substring(0, 50) }} />

//                 </div>

//                 <div className='text-xs text-gray-700'>
//                   <h2>{item.userEmail}</h2>
//                   <p className='flex items-center text-xs gap-1'><IoMdEye size={15} color="#b1b1b1" />{item.views}</p>
//                 </div>

//               </div>

//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>

//   )
// }

// export default AllBlogs

import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { IoMdEye } from "react-icons/io";

const getData = async (cat, email) => {
  console.log("CAT IN getData :", cat)
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/posts?cat=${cat || ""}&email=${email || ""}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const AllBlogs = async ({ cat, email }) => {
  let data = [];
  try {
    console.log("CAT INSIDE TRY BLOCK: ", cat)
    const result = await getData(cat, email);
    // Ensure result is an array
    if (Array.isArray(result)) {
      data = result;
    } else {
      console.error("Fetched data is not an array:", result);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <div className='flex flex-col bg-yellow p-auto'>
      <h2 className='font-medium text-2xl md:text-4xl border-b-2 border-black mb-6'>LATEST BLOGS</h2>
      <div className='flex flex-wrap gap-7'>
        {data.length > 0 ? (
          data.slice().reverse().map((item) => (
            <Link key={item.id} href={`${process.env.NEXTAUTH_URL}/view/${item.slug}`} className='w-[100%] sm:w-auto sm:h-[270px]'>
              <div className='rounded-[5px] h-[110px] w-[100%] sm:w-[240px] sm:h-[100%] overflow-hidden flex gap-2 sm:flex-col z-[5]' key={item.id}>
                <div className="relative z-[3] sm:h-[58%] w-[40%] sm:w-[100%] overflow-hidden rounded-3">
                  <Image className='rounded-md' src={item.img} alt={item.title} width={450} height={450} style={{ objectFit: 'cover', width: "100%", height: "100%" }} />
                </div>
                <div className='sm:h-[40%] sm:py-[4px] w-[60%] sm:w-[100%] flex flex-col'>
                  <div className='sm:mb-1'>
                    <div>
                      <p className='inline-block text-xs sm:font-[800] text-blue-500 uppercase'>{item.catSlug}</p>
                      <p className='inline-block text-blue-500 mx-1'>•</p>
                      <p className='inline-block text-xs sm:font-[800] text-blue-500'>{item.createdAt.substring(0, 10)}</p>
                    </div>
                    <div className='leading-[18px] sm:leading-[20px] font-bold text-base sm:text-base' dangerouslySetInnerHTML={{ __html: item?.title.substring(0, 50) }} />
                  </div>
                  <div className='text-xs text-gray-700'>
                    <h2>{item.userEmail}</h2>
                    <p className='flex items-center text-xs gap-1'><IoMdEye size={15} color="#b1b1b1" />{item.views}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </div>
    </div>
  );
}

export default AllBlogs;
