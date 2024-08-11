'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AllBlogs from "@/components/AllBlogs";

const BlogPage = () => {
    const router = useRouter();
    const [cat, setCat] = useState('');

    useEffect(() => {
        if (router && router.query) {
            const { cat: category } = router.query;
            if (category) {
                setCat(category);
            }
        }
    }, [router]);

    // You can render a fallback UI or loading state until cat is defined
    if (!cat) {
        return <div>Loading...</div>;
    }

    return (
        <div className="mt-5">
            <div className="flex justify-center items-center mb-7">
                <h1 className="text-6xl uppercase">{cat} Blog</h1>
            </div>
            <div>
                <AllBlogs cat={cat} />
            </div>
        </div>
    );
};

export default BlogPage;
