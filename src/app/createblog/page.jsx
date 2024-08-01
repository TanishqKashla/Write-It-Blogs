'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MdOutlineFileUpload } from "react-icons/md";
import Image from 'next/image';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
const CldUploadWidget = dynamic(() => import('next-cloudinary').then((mod) => mod.CldUploadWidget), { ssr: false });

// import ReactQuill from 'react-quill';
import "react-quill/dist/quill.bubble.css";
import { useSession } from 'next-auth/react';
// import { CldUploadWidget } from 'next-cloudinary';

const Createblog = () => {

    const { status } = useSession();
    const router = useRouter();

    if (status === "unauthenticated") {
        router.push("/");
    }

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [catSlug, setCatSlug] = useState("");

    const slugify = (str) =>
        str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");

    const handleUploadSuccess = (result) => {
        console.log(result.info.secure_url);
        setImageUrl(result.info.secure_url);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();


        const res = await fetch("https://write-it-chi.vercel.app/api/posts", {
            method: "POST",
            body: JSON.stringify({
                title,
                content: content,
                img: imageUrl,
                slug: slugify(title),
                catSlug: catSlug || "blog",
            }),
        });

        if (res.status === 200) {
            const data = await res.json();
            router.push("/");
        }
    };


    return (
        <div className='sm:px-[60px] md:px-[100px] relative pb-20'>
            <form onSubmit={handleSubmit} className='flex flex-col mt-[30px] sm:relative'>
                <div className='flex flex-col lg:flex-row gap-3 sm:gap-10 lg:h-[300px] pb-2 mt-[50px] sm:pb-5 border-b-2  border-gray-500'>

                    <div className='flex flex-col sm:w-[40%] '>
                        <textarea
                            name="title"
                            id="title"
                            placeholder='Title'
                            onChange={(title) => setTitle(title.target.value)}
                            value={title}
                            required
                            className='text-3xl sm:h-[100%] p-5 bg-transparent resize-none'
                        ></textarea>
                    </div>


                    {imageUrl === null || imageUrl === '' ? (
                        <div className='bg-gradient-to-l from-[rgba(34,193,195,1)] to-[rgba(253,187,45,1)]  w-[100%] aspect-[4/3] lg:w-[330px] rounded-md relative flex justify-center items-center'>
                            <p>Upload Thumbnail</p>
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
                    ) : (
                        <div className='sm:h-[100%] sm:w-[330px] w-[100%] aspect-[4/3] rounded-md overflow-hidden z-1 relative'>
                            <Image src={imageUrl} alt={title} height={500} width={500} style={{ objectFit: "cover", height: "100%", width: "100%" }} />
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
                    )}

                </div>

                <label htmlFor="content" className='text-2xl font-bold mt-5'>Write</label>
                <ReactQuill
                    theme="bubble"
                    value={content}
                    onChange={setContent}
                    placeholder="Tell your story..."
                    className='border-2 '
                />
                <div className='absolute flex  items-end gap-1 sm:gap-3 top-0 right-0 sm:right-[30px]'>
                    <div className='flex items-center justify-center gap-1 sm:gap-3'>
                        <div>Select Category</div>
                        <select onChange={(e) => setCatSlug(e.target.value)} className='rounded-full bg-transparent p-2 border-2 border-black'>
                            <option value="blog">Blog</option>
                            <option value="cars">Cars</option>
                            <option value="sports">Sports</option>
                            <option value="coding">Coding</option>
                            <option value="world">World</option>
                            <option value="travel">Travel</option>
                            <option value="space">Space</option>
                        </select>
                    </div>
                    <button className=' bg-blue-500 p-2 rounded-full  font-bold ml-3 border-2 border-black'>Publish</button>
                </div>
            </form>
        </div>
    )
}

export default Createblog
