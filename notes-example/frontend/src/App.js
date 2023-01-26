import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import noteService from "./services/notes";

const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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

    return (
        <div>
            <h1>Notes app</h1>
            <Notification message={errorMessage} />

            {
                user === null ?
                    <LoginForm
                        setUser={setUser}
                        setErrorMessage={setErrorMessage}
                        username={username}
                        setUsername={setUsername}
                        password={password}
                        setPassword={setPassword} /> :
                    <NoteForm
                        user={user}
                        newNote={newNote}
                        setNewNote={setNewNote}
                        notes={notes}
                        setNotes={setNotes} />
            }

            <NoteList
                notes={notes}
                setNotes={setNotes}
                showAll={showAll}
                setShowAll={setShowAll}
                setErrorMessage={setErrorMessage} />

            <Footer />
        </div>
    );
};

export default App;
