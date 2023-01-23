const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(express.json());
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(":method :url :status :req[content-length] - :response-time ms :body"));
app.use(express.static("build"));

const PORT = 3001;

function getRandomId() {
    const ID_LIMIT = 100000;
    return Math.floor(Math.random() * ID_LIMIT);
}

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
];

app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>");
});

app.get("/info", (req, res) => {
    const count = persons.length;
    const dateTime = new Date().toUTCString();
    res.send(`
        <div>Phonebook has info for ${count} people</div>
        <div>${dateTime}</div>
    `);
});

app.get("/api/persons", (req, res) => {
    res.json(persons);
});

app.post("/api/persons", (req, res) => {
    let person = req.body;
    person.id = getRandomId();

    if (person.name === undefined || person.number === undefined) {
        res.status(422).json({ error: "Either name or number is missing" });
        return;
    }
    const p = persons.filter((p) => p.name === person.name);
    if (p.length > 0) {
        res.status(400).json({ error: "Person with name already exists" });
        return;
    }

    persons.push(person);
    res.status(201).send("Person created!");
});

app.get("/api/persons/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const person = persons.filter((n) => n.id === id);

    if (person.length == 0)
        res.sendStatus(404);
    else
        res.json(person[0]);
});

app.delete("/api/persons/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const preLen = persons.length;
    persons = persons.filter((n) => n.id !== id);
    if (preLen > persons.length) {
        console.log(`Person ID ${id} deleted`);
        res.json({ error: `Person ID ${id} deleted` });
    } else {
        console.log(`Person ID ${id} not found`);
        res.status(404).json({ error: `Person ID ${id} not found` });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});