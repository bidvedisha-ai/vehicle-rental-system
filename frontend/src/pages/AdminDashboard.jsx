```jsx
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("user");

        navigate("/");
    };

    return (

        <div
            style={{
                minHeight: "100vh",
                padding: "40px",
                boxSizing: "border-box",
                textAlign: "center"
            }}
        >

            <h1>🚗 Vehicle Rental System</h1>

            <h2>👨‍💼 Admin Dashboard</h2>

            <p>
                Welcome, Admin!
            </p>

            <hr />

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "15px",
                    marginTop: "30px"
                }}
            >

                <button
                    onClick={() =>
                        navigate("/add-vehicle")
                    }
                >
                    ➕ Add Vehicle
                </button>


                <button
                    onClick={() =>
                        navigate("/update-vehicle")
                    }
                >
                    ✏️ Update Vehicle
                </button>


                <button
                    onClick={() =>
                        navigate("/delete-vehicle")
                    }
                >
                    🗑️ Delete Vehicle
                </button>


                <button
                    onClick={() =>
                        navigate("/admin-bookings")
                    }
                >
                    📋 View All Bookings
                </button>


                <button
                    onClick={logout}
                    style={{
                        marginTop: "20px"
                    }}
                >
                    🚪 Logout
                </button>

            </div>

        </div>
    );
}

export default AdminDashboard;
```
