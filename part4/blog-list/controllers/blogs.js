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

module.exports = blogRouter;