const mongoose = require('mongoose');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
require("dotenv").config();

const user = process.env.MONGO_USERNAME;
const pw = process.env.MONGO_PASSWORD;
const url =
    `mongodb+srv://${user}:${pw}@fsopen-benjababe.zqgy2ia.mongodb.net/personApp?retryWrites=true&w=majority`;

// let gName = process.argv[2],
//     gNum = process.argv[3];

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

personSchema.set("toJSON", {
    transform: (document, returned) => {
        returned.id = returned._id.toString();
        delete returned._id;
        delete returned.__v;
    }
});

const Person = mongoose.model('Person', personSchema);

// const person = new Person({
//     name: gName,
//     number: gNum,
// });

// person.save().then(res => {
//     console.log("Person saved!");
//     mongoose.connection.close();
// });

Person
    .find({})
    .then((persons) => {
        for (let person of persons) {
            console.log(`${person.name} ${person.number}`);
        }
        mongoose.connection.close();
    });
