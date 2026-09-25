import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please enter email and password");
            return;
        }

        try {

            const response = await axios.get("http://localhost:8080/users");

            const users = response.data;

            const user = users.find(
                (u) =>
                    u.email === email &&
                    u.password === password
            );

            if (user) {

                localStorage.setItem("user", JSON.stringify(user));

                alert("Login successful!");

                if (user.role === "ADMIN") {
                    navigate("/admin-dashboard");
                } else {
                    navigate("/dashboard");
                }

            } else {

                alert("Invalid email or password");

            }

        } catch (error) {

            console.error("Login error:", error);

            alert("Unable to connect to backend. Please start Spring Boot.");

        }
    };

    return (
        <div className="login-page">

            <div className="login-container">

                <h1>Vehicle Rental System</h1>

                <h2>Login</h2>

                <form onSubmit={handleLogin}>

                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                        />
                    </div>

                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />
                    </div>

                    <button type="submit">
                        Login
                    </button>

                </form>

                <p>
                    Don't have an account?{" "}
                    <Link to="/register">
                        Register
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Login;