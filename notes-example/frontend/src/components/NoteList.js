import { useState } from "react";

import Note from "./Note";
import noteService from "../services/notes";

const NoteList = ({ notes, setNotes, setErrorMessage }) => {
    const [showAll, setShowAll] = useState(true);

    const toggleImportanceOf = (id) => {
        const note = notes.find((n) => n.id === id);
        const changedNote = { ...note, important: !note.important };

        noteService
            .update(id, changedNote)
            .then((returnedNote) => {
                setNotes(
                    notes.map((note) => (note.id !== id ? note : returnedNote)),
                );
            })
            .catch((error) => {
                setErrorMessage(
                    `Note '${note.content}' was already removed from server`,
                );
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
                setNotes(notes.filter((n) => n.id !== id));
            });
    };

    const notesToShow = showAll
        ? notes
        : notes.filter((note) => note.important);

    return (
        <>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    Show {showAll ? "important" : "all"}
                </button>
            </div>
            <ul>
                <ul>
                    {notesToShow.map((note) => (
                        <Note
                            key={note.id}
                            note={note}
                            toggleImportance={() => toggleImportanceOf(note.id)}
                        />
                    ))}
                </ul>
            </ul>
        </>
    );
}

export default NoteList;