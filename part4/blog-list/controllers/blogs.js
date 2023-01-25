const blogRouter = require("express").Router();
const Blog = require("../model/blog");

blogRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
    const body = request.body;

    if (!body.title || !body.url) {
        response.sendStatus(400);
        return;
    }

    const blog = new Blog(body);
    const newBlog = await blog.save();
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
    if (!request.params.id) {
        response.sendStatus(400);
        return;
    }

    await Blog.findByIdAndDelete(request.params.id);
    response.sendStatus(204);
});

module.exports = blogRouter;