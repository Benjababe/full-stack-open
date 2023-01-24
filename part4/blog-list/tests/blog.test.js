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

afterAll(async () => {
    await mongoose.connection.close();
});