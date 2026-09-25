import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const handleRegister = async (event) => {

        event.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:8080/users",
                {
                    name: name,
                    email: email,
                    password: password,
                    phone: phone,
                    role: "CUSTOMER"
                }
            );

            console.log(response.data);

            alert("Registration successful!");

            setName("");
            setEmail("");
            setPassword("");
            setPhone("");

            navigate("/");

        } catch (error) {

            console.error(error);

            if (error.response) {
                alert(
                    "Registration failed: " +
                    (error.response.data.message ||
                     "Please check the entered details.")
                );
            } else {
                alert(
                    "Cannot connect to the Spring Boot server."
                );
            }
        }
    };

    return (

        <div className="login-page">

            <div className="login-card">

                <h1>🚗 Vehicle Rental System</h1>

                <h2>Create Account</h2>

                <form onSubmit={handleRegister}>

                    <div className="form-group">

                        <label>Name</label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>Phone</label>

                        <input
                            type="tel"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(event) =>
                                setPhone(event.target.value)
                            }
                            required
                        />

                    </div>


                    <button type="submit">
                        Register
                    </button>

                </form>


                <p className="register-text">

                    Already have an account?{" "}

                    <Link to="/">
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Register;