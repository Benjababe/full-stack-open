require("dotenv").config();
const process = require("node:process");

const Person = require("./models/person");

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(express.json());
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));
app.use(express.static("build"));
app.use(cors());

function getRandomId() {
    const ID_LIMIT = 100000;
    return Math.floor(Math.random() * ID_LIMIT);
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: "Unknown endpoint" });
};

function errorHandler(err, req, res, next) {
    console.error(err.message);

    if (err.name === "CastError")
        return res.status(400).send({ error: "Malformatted ID" });
    else if (err.name === "ValidationError")
        return res.status(400).json({ error: err.message });

    next(err);
}

app.get("/info", (req, res) => {
    const count = 0;
    const dateTime = new Date().toUTCString();
    res.send(`
        <div>Phonebook has info for ${count} people</div>
        <div>${dateTime}</div>
    `);
});

// retrieve all persons
app.get("/api/persons", (req, res) => {
    Person.find({}).then((persons) => {
        res.json(persons);
    });
});

// add new person
app.post("/api/persons", (req, res, next) => {
    let person = req.body;
    person.id = getRandomId();

    if (person.name === undefined || person.number === undefined) {
        return res.status(422).json({ error: "Either name or number is missing" });
    }

    const newPerson = new Person({
        name: person.name,
        number: person.number
    });

    newPerson
        .save()
        .then((saved) => {
            res.status(201).json(saved);
        })
        .catch((err) => next(err));
});

// retrieve specific person
app.get("/api/persons/:id", (req, res, next) => {
    const id = req.params.id;

    Person
        .findById(id)
        .then((person) => {
            if (person)
                res.json(person);
            else
                res.sendStatus(404);
        })
        .catch((err) => next(err));
});

app.put("/api/persons/:id", (req, res, next) => {
    const id = req.params.id;
    let person = req.body;

    Person
        .findByIdAndUpdate(
            id,
            person,
            { new: true, runValidators: true, context: "query" }
        )
        .then((updated) => {
            res.json(updated);
        })
        .catch((err) => next(err));
});

// delete specific person
app.delete("/api/persons/:id", (req, res, next) => {
    const id = req.params.id;

    Person
        .findByIdAndRemove(id)
        .then(() => {
            res.sendStatus(204);
        })
        .catch((err) => next(err));
});


app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});