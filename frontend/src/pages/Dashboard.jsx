import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {

        const savedUser =
            localStorage.getItem("user");

        if (!savedUser) {

            navigate("/");

            return;
        }

        setUser(JSON.parse(savedUser));

    }, [navigate]);


    const handleLogout = () => {

        localStorage.removeItem("user");

        alert("Logged out successfully!");

        navigate("/");

    };


    if (!user) {

        return (
            <div className="loading">
                Loading...
            </div>
        );
    }


    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#f4f7fb"
            }}
        >

            {/* HEADER */}

            <div
                style={{
                    background: "#1e3a8a",
                    color: "white",
                    padding: "20px 40px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >

                <h1
                    style={{
                        margin: 0,
                        fontSize: "26px"
                    }}
                >
                    🚗 Vehicle Rental System
                </h1>

                <button
                    onClick={handleLogout}
                    style={{
                        padding: "10px 18px",
                        border: "none",
                        borderRadius: "7px",
                        background: "#dc2626",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                >
                    Logout
                </button>

            </div>


            {/* CONTENT */}

            <div
                style={{
                    maxWidth: "1100px",
                    margin: "auto",
                    padding: "50px 25px"
                }}
            >

                <h2>
                    Welcome, {user.name}! 👋
                </h2>

                <p
                    style={{
                        color: "#6b7280",
                        marginBottom: "35px"
                    }}
                >
                    Manage your vehicle rentals from here.
                </p>


                {/* USER INFO */}

                <div
                    style={{
                        background: "white",
                        padding: "25px",
                        borderRadius: "12px",
                        boxShadow:
                            "0 4px 15px rgba(0,0,0,0.08)",
                        marginBottom: "35px"
                    }}
                >

                    <h3>
                        👤 My Profile
                    </h3>

                    <p>
                        <strong>Name:</strong>{" "}
                        {user.name}
                    </p>

                    <p>
                        <strong>Email:</strong>{" "}
                        {user.email}
                    </p>

                    <p>
                        <strong>Phone:</strong>{" "}
                        {user.phone}
                    </p>

                    <p>
                        <strong>Role:</strong>{" "}
                        {user.role}
                    </p>

                </div>


                {/* DASHBOARD OPTIONS */}

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: "25px"
                    }}
                >

                    {/* VEHICLES */}

                    <div
                        style={{
                            background: "white",
                            padding: "30px",
                            borderRadius: "12px",
                            boxShadow:
                                "0 4px 15px rgba(0,0,0,0.08)"
                        }}
                    >

                        <h2>
                            🚘 Vehicles
                        </h2>

                        <p>
                            Browse available vehicles
                            and book your favorite vehicle.
                        </p>

                        <button
                            className="primary-btn"
                            onClick={() =>
                                navigate("/vehicles")
                            }
                        >
                            View Vehicles
                        </button>

                    </div>


                    {/* BOOKINGS */}

                    <div
                        style={{
                            background: "white",
                            padding: "30px",
                            borderRadius: "12px",
                            boxShadow:
                                "0 4px 15px rgba(0,0,0,0.08)"
                        }}
                    >

                        <h2>
                            📋 My Bookings
                        </h2>

                        <p>
                            View and manage your
                            vehicle bookings.
                        </p>

                        <button
                            className="primary-btn"
                            onClick={() =>
                                navigate("/bookings")
                            }
                        >
                            My Bookings
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;