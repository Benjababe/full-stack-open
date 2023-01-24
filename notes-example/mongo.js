const mongoose = require("mongoose");
const config = require("./utils/config");

let url = config.MONGO_URI;
// url = "mongodb+srv://benjababe:htNazyNGEJDbsNG5@fsopen-benjababe.zqgy2ia.mongodb.net/testNoteApp?retryWrites=true&w=majority";
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
    content: "HTML is easy",
    date: new Date(),
    important: true,
});

// eslint-disable-next-line no-constant-condition
if (true) {
    note.save().then(() => {
        console.log("note saved!");
        mongoose.connection.close();
    });
} else {
    Note.find({}).then(result => {
        result.forEach(note => {
            console.log(note);
        });
        mongoose.connection.close();
    });
}