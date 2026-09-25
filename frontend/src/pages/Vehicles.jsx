import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Vehicles() {

    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        loadVehicles();
    }, []);

    const loadVehicles = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/vehicles"
            );

            setVehicles(response.data);
            setLoading(false);

        } catch (err) {
            console.error("Vehicle error:", err);
            setError("Unable to load vehicles. Please start the backend.");
            setLoading(false);
        }
    };

    const handleBook = (vehicle) => {
        if (vehicle.status !== "AVAILABLE") {
            alert("This vehicle is not available.");
            return;
        }

        navigate("/booking", {
            state: {
                vehicle: vehicle
            }
        });
    };

    if (loading) {
        return <h2 style={{ textAlign: "center" }}>Loading vehicles...</h2>;
    }

    if (error) {
        return (
            <div style={{ textAlign: "center" }}>
                <h2>{error}</h2>
                <button onClick={loadVehicles}>Try Again</button>
            </div>
        );
    }

    return (
        <div style={{ padding: "30px" }}>

            <h1 style={{ textAlign: "center" }}>
                Available Vehicles
            </h1>

            {vehicles.length === 0 ? (
                <h3 style={{ textAlign: "center" }}>
                    No vehicles found.
                </h3>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "25px",
                        marginTop: "30px"
                    }}
                >

                    {vehicles.map((vehicle) => (

                        <div
                            key={vehicle.id}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "12px",
                                padding: "20px",
                                boxShadow:
                                    "0 4px 10px rgba(0,0,0,0.1)"
                            }}
                        >

                            <h2>
                                {vehicle.brand} {vehicle.model}
                            </h2>

                            <p>
                                <b>Vehicle Number:</b>{" "}
                                {vehicle.vehicleNumber}
                            </p>

                            <p>
                                <b>Type:</b> {vehicle.type}
                            </p>

                            <p>
                                <b>Fuel:</b> {vehicle.fuelType}
                            </p>

                            <p>
                                <b>Transmission:</b>{" "}
                                {vehicle.transmission}
                            </p>

                            <p>
                                <b>Seats:</b> {vehicle.seats}
                            </p>

                            <p>
                                <b>Price per day:</b> ₹
                                {vehicle.pricePerDay}
                            </p>

                            <p>
                                <b>Status:</b> {vehicle.status}
                            </p>

                            <button
                                onClick={() => handleBook(vehicle)}
                                disabled={
                                    vehicle.status !== "AVAILABLE"
                                }
                            >
                                {vehicle.status === "AVAILABLE"
                                    ? "Book Vehicle"
                                    : "Not Available"}
                            </button>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}

export default Vehicles;