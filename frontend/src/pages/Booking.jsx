import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function Booking() {

    const location = useLocation();

    const navigate = useNavigate();

    const vehicle =
        location.state?.vehicle;

    const savedUser =
        localStorage.getItem("user");

    const user = savedUser
        ? JSON.parse(savedUser)
        : null;


    const [pickupDate, setPickupDate] =
        useState("");

    const [returnDate, setReturnDate] =
        useState("");


    const handleBooking = async (e) => {

        e.preventDefault();


        if (!user) {

            alert(
                "Please login before booking."
            );

            navigate("/");

            return;
        }


        if (!vehicle) {

            alert(
                "Vehicle information is missing."
            );

            navigate("/vehicles");

            return;
        }


        if (!pickupDate || !returnDate) {

            alert(
                "Please select pickup and return dates."
            );

            return;
        }


        if (returnDate < pickupDate) {

            alert(
                "Return date cannot be before pickup date."
            );

            return;
        }


        try {

            const bookingData = {

                userId: user.id,

                vehicleId: vehicle.id,

                pickupDate: pickupDate,

                returnDate: returnDate

            };


            await axios.post(
                "http://localhost:8080/bookings",
                bookingData
            );


            alert(
                "Vehicle booked successfully!"
            );

            navigate("/bookings");

        } catch (error) {

            console.error(error);

            if (
                error.response &&
                error.response.data
            ) {

                alert(
                    typeof error.response.data ===
                        "string"
                        ? error.response.data
                        : "Booking failed."
                );

            } else {

                alert(
                    "Booking failed. Please try again."
                );
            }
        }
    };


    if (!vehicle) {

        return (

            <div className="page-container">

                <div className="empty-message">

                    <h2>
                        Vehicle not found
                    </h2>

                    <button
                        className="primary-btn"
                        onClick={() =>
                            navigate("/vehicles")
                        }
                    >
                        Go to Vehicles
                    </button>

                </div>

            </div>
        );
    }


    return (

        <div className="page-container">

            <div className="page-header">

                <h1>
                    🚗 Book Vehicle
                </h1>

                <button
                    className="back-btn"
                    onClick={() =>
                        navigate("/vehicles")
                    }
                >
                    ← Back to Vehicles
                </button>

            </div>


            <div
                style={{
                    maxWidth: "650px",
                    margin: "0 auto",
                    background: "white",
                    padding: "35px",
                    borderRadius: "12px",
                    boxShadow:
                        "0 4px 15px rgba(0,0,0,0.08)"
                }}
            >

                {/* VEHICLE DETAILS */}

                <h2>
                    {vehicle.brand}{" "}
                    {vehicle.model}
                </h2>

                <p>
                    <strong>
                        Vehicle Number:
                    </strong>{" "}
                    {vehicle.vehicleNumber}
                </p>

                <p>
                    <strong>
                        Type:
                    </strong>{" "}
                    {vehicle.type}
                </p>

                <p>
                    <strong>
                        Price Per Day:
                    </strong>{" "}
                    ₹{vehicle.pricePerDay}
                </p>

                <hr
                    style={{
                        margin: "25px 0"
                    }}
                />


                {/* BOOKING FORM */}

                <form onSubmit={handleBooking}>

                    <div
                        style={{
                            marginBottom: "20px"
                        }}
                    >

                        <label
                            style={{
                                display: "block",
                                marginBottom: "8px",
                                fontWeight: "bold"
                            }}
                        >
                            Pickup Date
                        </label>

                        <input
                            type="date"
                            value={pickupDate}
                            onChange={(e) =>
                                setPickupDate(
                                    e.target.value
                                )
                            }
                            required
                            style={{
                                width: "100%",
                                padding: "12px",
                                border:
                                    "1px solid #d1d5db",
                                borderRadius: "7px",
                                fontSize: "15px"
                            }}
                        />

                    </div>


                    <div
                        style={{
                            marginBottom: "25px"
                        }}
                    >

                        <label
                            style={{
                                display: "block",
                                marginBottom: "8px",
                                fontWeight: "bold"
                            }}
                        >
                            Return Date
                        </label>

                        <input
                            type="date"
                            value={returnDate}
                            min={pickupDate}
                            onChange={(e) =>
                                setReturnDate(
                                    e.target.value
                                )
                            }
                            required
                            style={{
                                width: "100%",
                                padding: "12px",
                                border:
                                    "1px solid #d1d5db",
                                borderRadius: "7px",
                                fontSize: "15px"
                            }}
                        />

                    </div>


                    <button
                        type="submit"
                        className="primary-btn"
                        style={{
                            width: "100%"
                        }}
                    >
                        Confirm Booking
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Booking;