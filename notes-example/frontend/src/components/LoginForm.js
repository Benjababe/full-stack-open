import loginService from "../services/login";
import noteService from "../services/notes";

const LoginForm = ({ setUser, setErrorMessage, username, setUsername, password, setPassword }) => {
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

    return (
        <>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </>
    );
}

export default LoginForm;