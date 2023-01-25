const listHelper = require("../utils/list-helper");
const Blog = require("../model/blog");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(listHelper.initialBlogs);
});

describe("Blog sanity check", () => {
    test("Blogs are returned as JSON", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    test("Blogs are returned as JSON", async () => {
        const response = await api.get("/api/blogs");
        expect(response.body[0]["id"]).toBeDefined();
    });

    test("Correct number of blogs returned", async () => {
        const response = await api.get("/api/blogs");
        expect(response.body).toHaveLength(listHelper.initialBlogs.length);
    });
});

describe("Adding a blog post", () => {
    test("A valid blog can be added", async () => {
        const newBlog = {
            title: "Dances with Water",
            author: "Not popular guy",
            url: "https://test.com/dances-with-water",
            likes: 2
        };

        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const blogsAtEnd = await listHelper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(listHelper.initialBlogs.length + 1);

        const titles = blogsAtEnd.map(b => b.title);
        expect(titles).toContain("Dances with Water");
    });

    test("Likes will default to 0 if not defined", async () => {
        const newBlog = new Blog({
            title: "Dances with Water",
            author: "Not popular guy",
            url: "https://test.com/dances-with-water",
        });

        expect(newBlog.likes).toBeDefined();
        expect(newBlog.likes).toEqual(0);
    });

    test("Submitting blog w/o title or url will result in 400 error", async () => {
        const titlelessBlog = new Blog({
            author: "Not popular guy",
            url: "https://test.com/dances-with-water",
            likes: 3
        });

        await api
            .post("/api/blogs")
            .send(titlelessBlog)
            .expect(400);

        const urllessBlog = new Blog({
            title: "Dances with Water",
            author: "Not popular guy",
            likes: 3
        });

        await api
            .post("/api/blogs")
            .send(urllessBlog)
            .expect(400);
    });
});

describe("Updating blog posts", () => {
    const newLikes = 100;

    test("Updating blog using invalid id", async () => {
        const invalidId = -1;

        await api
            .put(`/api/blogs/${invalidId}`)
            .send({ likes: newLikes })
            .expect(400);
    });

    test("Updating blog using valid id", async () => {
        const blogsAtStart = await listHelper.blogsInDb();
        const blogToChange = blogsAtStart[0];
        const blogId = blogToChange.id;

        const updatedBlog = await api
            .put(`/api/blogs/${blogId}`)
            .send({ likes: newLikes })
            .expect(200);

        expect(updatedBlog.body.likes).toBeDefined();
        expect(updatedBlog.body.likes).toEqual(newLikes);
    });
});

describe("Deleting blog posts", () => {
    test("Deleting blog using invalid id", async () => {
        const invalidId = -1;

        await api
            .delete(`/api/blogs/${invalidId}`)
            .expect(400);
    });

    test("Deleting blog using valid id", async () => {
        const blogsAtStart = await listHelper.blogsInDb();
        const blogToDelete = blogsAtStart[0];

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204);

        const blogsAtEnd = await listHelper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

        const titles = blogsAtEnd.map(b => b.title);
        expect(titles).not.toContain(blogToDelete.title);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});