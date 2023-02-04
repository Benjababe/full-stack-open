import { useRef } from 'react'
import Blog from "./Blog";
import blogService from "../services/blogs";

const BlogForm = ({ user, blogs, setUser, setBlogs, setMessage }) => {
    const titleRef = useRef(null),
        authorRef = useRef(null),
        urlRef = useRef(null);

    const logout = () => {
        setUser(null);
        window.localStorage.removeItem("blogAppUser");
    }

    const submitBlog = async () => {
        const blogObject = {
            title: titleRef.current.value,
            author: authorRef.current.value,
            url: urlRef.current.value,
            likes: 0
        };

        const returnedBlog = await blogService.create(blogObject);
        setBlogs(blogs.concat(returnedBlog));

        setMessage({
            text: `A new blog "${titleRef.current.value}" by ${authorRef.current.value} added`,
            status: "success"
        });
        setTimeout(() => setMessage(null), 3000);

        titleRef.current.value = "";
        authorRef.current.value = "";
        urlRef.current.value = "";
    }

    return (
        <div>
            <h2>Blogs</h2>

            <p>
                {user.username} currently logged in
                <input type="button" onClick={logout} value="Logout" />
            </p>

            <h2>Create New Blog</h2>
            Title: <input type="text" ref={titleRef} /><br />
            Author: <input type="text" ref={authorRef} /><br />
            URL: <input type="text" ref={urlRef} /><br />
            <input type="button" onClick={submitBlog} value="Create" />

            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    );
}

export default BlogForm;