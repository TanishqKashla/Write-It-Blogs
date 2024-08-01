'use client'
import React from 'react'
import { MdDelete } from "react-icons/md";
import { useRouter } from 'next/navigation';




const RemoveBtn = ({ id }) => {

    const router = useRouter()

    const deleteBlog = async () => {
        const confirmed = confirm('Are you sure you want to delete this?')

        if (confirmed) {
            const res = await fetch(`https://write-it-chi.vercel.app/api/posts?id=${id}`, {
                method: 'DELETE'
            })

            if (res.ok) {

                router.back().then(() => {
                    router.reload()
                })
            }
        }
    }

    return (
        <div>
            <button onClick={deleteBlog} className='flex justify-center items-center bg-red-500 p-[20px] rounded-full shadow-[0_3px_5px_0_rgba(0,0,0,0.3),0_3px_5px_0_rgba(0,0,0,0.3)]'>
                <MdDelete color='white' size={20} />
            </button>
        </div>
    )
}

export default RemoveBtn