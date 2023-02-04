import { useState, useEffect, useRef } from "react";
import LoginForm from "./components/LoginForm";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import noteService from "./services/notes";
import Togglable from "./components/Toggleable";

const App = () => {
    const [notes, setNotes] = useState([]);
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const noteFormRef = useRef();

    useEffect(() => {
        noteService.getAll().then((initialNotes) => {
            setNotes(initialNotes);
        });
    }, []);

    useEffect(() => {
        const userJSON = window.localStorage.getItem("noteAppUser");
        if (userJSON) {
            const user = JSON.parse(userJSON);
            setUser(user);
            noteService.setToken(user.token);
        }
    }, []);

    const addNote = async (noteObject) => {
        const returnedNote = await noteService.create(noteObject);
        setNotes(notes.concat(returnedNote));
        noteFormRef.current.toggleVisibility();
    }

    return (
        <div>
            <h1>Notes app</h1>
            <Notification message={errorMessage} />

            {
                user === null ?
                    <Togglable buttonLabel="Show Login">
                        <LoginForm
                            setUser={setUser}
                            setErrorMessage={setErrorMessage} />
                    </Togglable> :

                    <div>
                        <p>{user.name} is currently logged in</p>
                        <Togglable buttonLabel="Show New Note" ref={noteFormRef}>
                            <NoteForm createNote={addNote} />
                        </Togglable>
                    </div>
            }

            <NoteList
                notes={notes}
                setNotes={setNotes}
                setErrorMessage={setErrorMessage} />

            <Footer />
        </div>
    );
};

export default App;
