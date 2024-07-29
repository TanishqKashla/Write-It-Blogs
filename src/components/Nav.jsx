'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import { LuPen } from "react-icons/lu";
import { IoMdMenu } from "react-icons/io";
import { useRouter } from 'next/navigation'




const Nav = () => {

  const { data, status } = useSession()
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter()

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };


  return (
    <div className='flex justify-between items-center h-[80px] border-b-[1px] border-gray-400'>

      <Link href={'/'} className='w-[80px]  font-bold text-[25px]'>
        <Image src="/logo-black.png" alt='website logo' width={100} height={70} style={{ objectFit: "cover", height: "100%", width: "100%" }} />
      </Link>


      {status === "authenticated" ? (
        <div>

          <div className='hidden lg:flex text-gray-900 font-bold gap-5 items-center'>
            <p>Welcome, {data.user.name}</p>
            <Link href={`/user/${data.user.email}`} className=' text-blue-500'>
              Your Blogs
            </Link>
            <Link href={'/createblog'} className='flex justify-center  items-center gap-2 border-2 border-blue-500 px-4 py-3 rounded-full' >
              <LuPen />
              Create new blog
            </Link>

            {data?.user?.image && (
              <div className='rounded-full overflow-hidden h-10'>
                <img style={{ objectFit: 'cover', width: "100%", height: "100%" }} src={`${data.user.image}`} alt="user pfp" />

              </div>
            )}
            <div onClick={signOut} className='cursor-pointer text-blue-500'>
              Log Out
            </div>
          </div>


          <div className='lg:hidden flex justify-center items-center gap-5 relative'>
            {data?.user?.image && (
              <div className='rounded-full overflow-hidden h-10'>
                <img style={{ objectFit: 'cover', width: "100%", height: "100%" }} src={data.user.image} alt="user pfp" />
              </div>
            )}

            {/* hamburger menu */}
            <div onClick={toggleMenu} className='cursor-pointer'>
              <IoMdMenu size={30} />
            </div>
            <div onClick={toggleMenu} className={`absolute bg-white rounded-md border-2 top-12 right-0 z-20 w-[180px] flex flex-col gap-3 p-4 text-blue-500 ${menuVisible ? '' : 'hidden'}`}>
              <Link href={`/${data.user.email}`} className=' text-blue-500'>
                Your Blogs
              </Link>
              <Link href={'/createblog'} className='border-b-2 border-t-2 py-4' >
                Create new blog
              </Link>

              <div onClick={signOut} className='cursor-pointer text-blue-500'>
                Log Out
              </div>

            </div>
          </div>
        </div>

      ) : (
        <Link href={'/login'} className='flex justify-center text-blue-500 items-center gap-2 border-2 border-blue-500 px-4 py-3 rounded-full'>
          Login
        </Link>
      )}

    </div>
  )
}

export default Nav