import loginService from "../services/login";

const LoginForm = ({ username, password, setUser, setUsername, setPassword, setMessage }) => {
    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({
                username, password
            });

            window.localStorage.setItem(
                "blogAppUser", JSON.stringify(user)
            );

            setUser(user);
            setUsername("");
            setPassword("")
        } catch (ex) {
            setMessage({
                text: "Invalid login credentials",
                status: "error"
            });
            setTimeout(() => setMessage(null), 3000);
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