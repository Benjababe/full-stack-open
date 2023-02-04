import { useState } from "react";

import loginService from "../services/login";
import noteService from "../services/notes";

const LoginForm = ({ setUser, setErrorMessage }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({
                username, password
            });

            window.localStorage.setItem(
                "noteAppUser", JSON.stringify(user)
            );

            noteService.setToken(user.token);
            setUser(user);
            setUsername("");
            setPassword("")
        } catch (ex) {
            setErrorMessage("Invalid login credentials");
            setTimeout(() => setErrorMessage(null), 3000);
        }
    };

    const usernameChange = (e) => setUsername(e.target.value);
    const passwordChange = (e) => setPassword(e.target.value);

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <div>
                    Username
                    <input
                        value={username}
                        onChange={usernameChange}
                    />
                </div>
                <div>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={passwordChange}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm;