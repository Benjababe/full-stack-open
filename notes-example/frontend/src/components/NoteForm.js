import noteService from "../services/notes";

const NoteForm = ({ user, newNote, setNewNote, notes, setNotes }) => {
    const addNote = async (event) => {
        event.preventDefault();
        const noteObject = {
            content: newNote,
            important: Math.random() > 0.5,
        };

        const returnedNote = await noteService.create(noteObject);
        setNotes(notes.concat(returnedNote));
        setNewNote("");
    };

    const handleNoteChange = (event) => {
        setNewNote(event.target.value);
    };

    return (
        <div>
            <p>{user.name} is currently logged in</p>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit">save</button>
            </form>
        </div>
    );
}

export default NoteForm;