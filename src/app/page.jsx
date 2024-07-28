import AllBlogs from '@/components/AllBlogs'
import Category from '@/components/Category'
import Featured from '@/components/Featured'
import Trending from '@/components/Trending'
import React from 'react'

const page = () => {

  return (
    <div className=''>
      <Featured />

      <div className='flex flex-col-reverse sm:flex sm:flex-row gap-[40px]'>
        <AllBlogs />
        <div>

          <Category />
          <Trending />
        </div>
      </div>
    </div>
  )
}

export default page