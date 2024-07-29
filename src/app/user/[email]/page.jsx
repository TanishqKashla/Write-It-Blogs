import AllBlogs from '@/components/AllBlogs';
import React from 'react'

const UserBlogs = ({ params }) => {
    const { email } = params;
    const decodedEmail = decodeURIComponent(email);
    console.log(decodedEmail)
    return (
        <div>
            <h1 className='sm:text-2xl md:text-4xl my-7 text-blue-500 font-bold px-5'>{decodedEmail}&apos;s Blogs :</h1>
            <div>
                <AllBlogs email={decodedEmail} />
            </div>
        </div>
    )
}

export default UserBlogs