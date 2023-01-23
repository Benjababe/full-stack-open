const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("build"));

let notes = [
    {
        "id": 1,
        "content": "HTML is easy",
        "date": "2022-1-17T17:30:31.098Z",
        "important": true
    },
    {
        "id": 2,
        "content": "Browser can execute only JavaScript",
        "date": "2022-1-17T18:39:34.091Z",
        "important": false
    },
    {
        "id": 3,
        "content": "GET and POST are the most important methods of HTTP protocol",
        "date": "2022-1-17T19:20:14.298Z",
        "important": true
    }];

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
});

app.get('/api/notes', (request, response) => {
    response.json(notes)
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});