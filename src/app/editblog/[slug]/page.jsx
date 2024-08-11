import EditBlogForm from '@/components/EditBlogForm';
import React from 'react'

const getBlog = async (slug) => {
    try {
        const res = await fetch(`api/posts/${slug}`, { cache: 'no-store' })

        if (!res.ok) {
            throw new Error('FAILED TO FETCH BLOG FROM ID')
        }


        return res.json();
    } catch (error) {
        console.log(error)
    }
}


const EditBlog = async ({ params }) => {


    // const { data } = useSession();
    // const router = useRouter();

    // if (data !== '') {
    //     router.push("/");
    // }


    const { slug } = await params;
    const blog = await getBlog(slug);
    const { title, content, img, catSlug, userEmail } = blog;

    return (
        <div>
            <EditBlogForm title={title} content={content} img={img} catSlug={catSlug} slug={slug} userEmail={userEmail} />
        </div>
    )
}

export default EditBlog  