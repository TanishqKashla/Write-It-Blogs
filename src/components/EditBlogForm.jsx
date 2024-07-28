'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MdOutlineFileUpload } from "react-icons/md";
import Image from 'next/image';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.bubble.css";
import { useSession } from 'next-auth/react';
import { CldUploadWidget } from 'next-cloudinary';

const EditBlogForm = ({ title, content, img, catSlug, slug, userEmail }) => {

    const router = useRouter()
    const { data: session, status } = useSession();

    useEffect(() => {
        // Wait for the session to be loaded
        if (status === 'loading') return;

        // Check if the user is not logged in or if the email doesn't match
        if (!session || session.user.email !== userEmail) {
            router.push('/');
        }
    }, [session, status, userEmail, router]);

    const [newTitle, setNewTitle] = useState(title)
    const [newContent, setNewContent] = useState(content)
    const [newImageUrl, setNewImageUrl] = useState(img)
    const [newCatSlug, setNewCatSlug] = useState(catSlug)

    const handleChange = (content) => {
        setNewContent(content);
    };

    const slugify = (str) =>
        str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");

    const handleUploadSuccess = (result) => {
        setNewImageUrl(result.info.secure_url);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(`/api/posts/${slug}`, {
            method: "PUT",
            body: JSON.stringify({
                title: newTitle,
                content: newContent,
                img: newImageUrl,
                slug: slugify(newTitle),
                catSlug: newCatSlug
            }),
        });

        if (res.status === 200) {
            const data = await res.json();
            router.push(`/view/${slugify(newTitle)}`).then(() => {
                router.reload();
            })
        }
    };


    return (

        <div className='sm:px-[60px] md:px-[100px] relative pb-20'>
            <form onSubmit={handleSubmit} className='flex flex-col mt-[30px] sm:relative'>
                <div className='flex flex-col lg:flex-row gap-3 sm:gap-10 lg:h-[300px] pb-2 mt-[50px] sm:pb-5 border-b-2  border-gray-500'>

                    <div className='flex flex-col lg:w-[40%] '>
                        <textarea
                            name="title"
                            id="title"
                            placeholder='Title'
                            onChange={(title) => setNewTitle(title.target.value)}
                            value={newTitle}
                            required
                            className='text-3xl sm:h-[100%] w-[100%] p-5 bg-transparent resize-none'
                        ></textarea>
                    </div>

                    <div className='lg:h-[100%] lg:w-[330px] w-[100%] aspect-[4/3] rounded-md overflow-hidden z-1 relative'>
                        <Image src={newImageUrl} fill quality={1} style={{ objectFit: "cover", height: "100%", width: "100%" }} />
                        <CldUploadWidget uploadPreset="ubieie8e" onSuccess={handleUploadSuccess}>
                            {({ open }) => {
                                return (
                                    <button type="button" onClick={() => open()} className='absolute bottom-3 right-3'>
                                        <MdOutlineFileUpload size={40} className='bg-white p-3 rounded-full' />
                                    </button>
                                );
                            }}
                        </CldUploadWidget>
                    </div>
                </div>

                <ReactQuill
                    theme="bubble"
                    onChange={handleChange}
                    value={newContent}
                    placeholder="Tell your story..."
                    className='border-2 '
                />
                <div className='absolute flex  items-end gap-1 sm:gap-3 top-0 right-0 sm:right-[30px]'>
                    <div className='flex items-center justify-center gap-1 sm:gap-3'>
                        <div>Select Category</div>
                        <select onChange={(e) => setNewCatSlug(e.target.value)} value={catSlug} className='rounded-full bg-transparent p-2 border-2 border-black'>
                            <option value="blog">Blog</option>
                            <option value="cars">Cars</option>
                            <option value="sports">Sports</option>
                            <option value="coding">Coding</option>
                            <option value="world">World</option>
                            <option value="travel">Travel</option>
                            <option value="space">Space</option>
                        </select>
                    </div>
                    <button className=' bg-blue-500 p-2 rounded-full  font-bold ml-3 border-2 border-black'>Update</button>
                </div>
            </form>
        </div>
    )
}

export default EditBlogForm