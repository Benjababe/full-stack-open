const process = require("node:process");
const mongoose = require("mongoose");

const url = process.env.MONGO_URI;

mongoose
    .connect(url)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB", err.message));

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: 3
    },
    number: {
        type: String,
        required: true,
        minLength: 8,
        validate: {
            validator: (v) => /\d{2,3}-\d+/.test(v)
        }
    },
});

personSchema.set("toJSON", {
    transform: (document, returned) => {
        returned.id = returned._id.toString();
        delete returned._id;
        delete returned.__v;
    }
});

module.exports = mongoose.model("Person", personSchema);