'use client'
import { CldUploadWidget } from '@cloudinary/react';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleOnUpload = (error, result, widget) => {
        if (result.event === 'success') {
            setImageUrl(result.info.secure_url);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const blogData = {
            title,
            content,
            imageUrl,
        };

        const response = await fetch('/api/blogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blogData),
        });

        if (response.ok) {
            // Handle success
        } else {
            // Handle error
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <CldUploadWidget uploadPreset="ubieie8e" onUpload={handleOnUpload}>
                {({ open }) => {
                    return (
                        <button type="button" onClick={() => open()}>
                            Upload an Image
                        </button>
                    );
                }}
            </CldUploadWidget>
            <button type="submit">Create Blog</button>
        </form>
    );
};

export default CreateBlog;
