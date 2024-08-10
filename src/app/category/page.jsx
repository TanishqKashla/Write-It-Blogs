import { useRouter } from 'next/navigation';
import AllBlogs from "@/components/AllBlogs";

const BlogPage = () => {
    const router = useRouter();
    const { cat } = router.query;

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
