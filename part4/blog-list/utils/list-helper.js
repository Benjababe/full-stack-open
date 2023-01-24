const Blog = require("../model/blog");

const initialBlogs = [
    {
        title: "Dances with fire",
        author: "Not popular guy",
        url: "https://test.com/dances-with-fire",
        likes: 0
    },
    {
        title: "Apples and Oranges",
        author: "Popular guy",
        url: "https://test.com/apples-and-oranges",
        likes: 1000
    }
];

const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favouriteBlog = (blogs) => {
    return blogs.reduce((largest, blog) => {
        return (blog.likes > largest.likes) ? blog : largest;
    }, blogs[0]);
};

const mostBlogs = (blogs) => {
    let blogMap = {};
    let maxBlogs = { author: "", blogs: 0 };

    for (const blog of blogs) {
        if (blogMap[blog.author])
            blogMap[blog.author]++;
        else
            blogMap[blog.author] = 1;

        if (blogMap[blog.author] > maxBlogs.blogs)
            maxBlogs = { author: blog.author, blogs: blogMap[blog.author] };
    }

    return maxBlogs;
};

const mostLikes = (blogs) => {
    let blogMap = {};
    let maxBlogs = { author: "", likes: -1 };

    for (const blog of blogs) {
        if (blogMap[blog.author])
            blogMap[blog.author] += blog.likes;
        else
            blogMap[blog.author] = blog.likes;

        if (blogMap[blog.author] > maxBlogs.likes)
            maxBlogs = { author: blog.author, likes: blogMap[blog.author] };
    }

    return maxBlogs;
};

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
};

module.exports = {
    initialBlogs,
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes,
    blogsInDb,
};