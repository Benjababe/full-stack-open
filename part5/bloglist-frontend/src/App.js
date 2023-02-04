import { useState, useEffect } from 'react'
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from './services/blogs'

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [message, setMessage] = useState(null);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (user) {
            blogService.getAll().then(blogs => {
                console.log(blogs);
                setBlogs(blogs);
            });
        }
    }, [user]);

    useEffect(() => {
        const userJSON = window.localStorage.getItem("blogAppUser");
        if (userJSON) {
            const tmpUser = JSON.parse(userJSON);
            setUser(tmpUser);
            blogService.setToken(tmpUser.token);
        }
    }, []);

    return (
        <div>
            <Notification message={message} />
            {
                (user === null) ?
                    <LoginForm
                        username={username}
                        password={password}
                        setUser={setUser}
                        setUsername={setUsername}
                        setPassword={setPassword}
                        setMessage={setMessage} /> :
                    <BlogForm
                        user={user}
                        blogs={blogs}
                        setUser={setUser}
                        setBlogs={setBlogs}
                        setMessage={setMessage} />
            }
        </div>
    );
}

export default App