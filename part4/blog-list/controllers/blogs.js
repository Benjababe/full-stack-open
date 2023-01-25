const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/", async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate("user", {
            username: true,
            name: true,
            id: true
        });
    response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
    const body = request.body;

    if (!body.title || !body.url)
        return response.sendStatus(400);

    const user = await User.findById(request.user.id);
    body.user = request.user.id;

    const blog = new Blog(body);
    const newBlog = await blog.save();

    user.blogs = user.blogs.concat(blog._id);
    await user.save();

    response.status(201).json(newBlog);
});

blogRouter.put("/:id", async (request, response) => {
    const body = request.body;

    const blog = {
        likes: body.likes
    };

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
    response.json(updatedBlog);
});

blogRouter.delete("/:id", async (request, response) => {
    if (!request.params.id)
        return response.sendStatus(400);

    const blogToDelete = await Blog.findById(request.params.id);
    const blogUserId = blogToDelete.user.toString();
    if (blogUserId !== request.user.id)
        return response.status(401).json({ error: "Invalid token provided" });

    await blogToDelete.delete();
    response.sendStatus(204);
});

module.exports = blogRouter;