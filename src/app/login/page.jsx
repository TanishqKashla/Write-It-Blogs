'use client'

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Login = () => {
    const router = useRouter();

    const { data, status } = useSession()

    console.log(data, status)

    if (status === "loading") {
        return <div>Loading...</div>
    }
    if (status === "authenticated") {
        router.push("/")
    }


    return (
        <div className='flex flex-col justify-center items-center h-[90vh]'>
            <div className='flex flex-col sm:flex-row gap-5 justify-center items-center'>
                <div className='flex justify-between gap-2 w-fit items-center bg-red-600 p-2 px-3 rounded-lg cursor-pointer'
                    onClick={() => signIn("google")}
                >
                    <FaGoogle color='white' size={20} />
                    <p className='text-white'>Login using Google</p>
                </div>
                <div className='flex justify-between gap-2 w-fit items-center bg-slate-900 p-2 px-3 rounded-lg'
                    onClick={() => signIn("github")}
                >
                    <FaGithub color='white' size={20} />
                    <p className='text-white'>Login using Github</p>
                </div>
            </div>
        </div>
    )
}

export default Login