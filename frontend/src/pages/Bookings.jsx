import { useEffect, useState } from "react";
import axios from "axios";

function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [cancellingId, setCancellingId] = useState(null);

    // Load bookings
    const loadBookings = async () => {
        try {
            setLoading(true);
            setError("");

            const user = JSON.parse(localStorage.getItem("user"));

            if (!user) {
                setError("Please login first.");
                setLoading(false);
                return;
            }

            const response = await axios.get(
                "http://localhost:8080/bookings"
            );

            const allBookings = response.data;

            // Show only current user's active bookings
            // CANCELLED bookings will not be displayed
            const myBookings = allBookings.filter(
                (booking) =>
                    booking.user &&
                    booking.user.id === user.id &&
                    String(booking.bookingStatus || "").toUpperCase() !==
                        "CANCELLED"
            );

            setBookings(myBookings);

        } catch (err) {
            console.error("Booking loading error:", err);

            setError(
                "Unable to load bookings. Please check the backend."
            );
        } finally {
            setLoading(false);
        }
    };

    // Load bookings when page opens
    useEffect(() => {
        loadBookings();
    }, []);

    // Cancel booking
    const handleCancelBooking = async (bookingId) => {

        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this booking?"
        );

        if (!confirmCancel) {
            return;
        }

        try {
            setCancellingId(bookingId);

            // Call backend cancel API
            await axios.put(
                `http://localhost:8080/bookings/${bookingId}/cancel`
            );

            alert("Booking cancelled successfully!");

            // Refresh booking list
            await loadBookings();

        } catch (err) {
            console.error("Cancel booking error:", err);

            if (
                err.response &&
                err.response.data &&
                err.response.data.message
            ) {
                alert(err.response.data.message);
            } else {
                alert(
                    "Unable to cancel booking. Please try again."
                );
            }

        } finally {
            setCancellingId(null);
        }
    };

    // Loading
    if (loading) {
        return (
            <div
                style={{
                    textAlign: "center",
                    padding: "50px"
                }}
            >
                <h2>Loading bookings...</h2>
            </div>
        );
    }

    return (
        <div
            style={{
                padding: "30px",
                minHeight: "80vh"
            }}
        >

            <h1
                style={{
                    textAlign: "center",
                    marginBottom: "30px"
                }}
            >
                📋 My Bookings
            </h1>

            {/* Error */}
            {error && (
                <div
                    style={{
                        textAlign: "center",
                        color: "red",
                        marginBottom: "20px"
                    }}
                >
                    <h3>{error}</h3>
                </div>
            )}

            {/* No bookings */}
            {!error && bookings.length === 0 && (
                <div
                    style={{
                        textAlign: "center",
                        marginTop: "60px"
                    }}
                >
                    <h2>No bookings found.</h2>

                    <p>
                        You have not booked any vehicle yet.
                    </p>
                </div>
            )}

            {/* Booking cards */}
            {bookings.length > 0 && (
                <div
                    style={{
                        maxWidth: "1000px",
                        margin: "0 auto"
                    }}
                >

                    {bookings.map((booking) => (
                        <div
                            key={booking.id}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "12px",
                                padding: "25px",
                                marginBottom: "20px",
                                boxShadow:
                                    "0 4px 10px rgba(0,0,0,0.1)",
                                backgroundColor: "#ffffff"
                            }}
                        >

                            <h2>
                                Booking ID: #{booking.id}
                            </h2>

                            <p>
                                <b>Vehicle:</b>{" "}
                                {booking.vehicle
                                    ? `${booking.vehicle.brand} ${booking.vehicle.model}`
                                    : "Vehicle information unavailable"}
                            </p>

                            <p>
                                <b>Vehicle Number:</b>{" "}
                                {booking.vehicle
                                    ? booking.vehicle.vehicleNumber
                                    : "-"}
                            </p>

                            <p>
                                <b>Pickup Date:</b>{" "}
                                {booking.pickupDate}
                            </p>

                            <p>
                                <b>Return Date:</b>{" "}
                                {booking.returnDate}
                            </p>

                            <p>
                                <b>Total Amount:</b>{" "}
                                ₹{booking.totalAmount}
                            </p>

                            <p>
                                <b>Status:</b>{" "}
                                {booking.bookingStatus}
                            </p>

                            {/* Cancel button */}
                            <button
                                onClick={() =>
                                    handleCancelBooking(
                                        booking.id
                                    )
                                }
                                disabled={
                                    cancellingId === booking.id
                                }
                                style={{
                                    marginTop: "15px",
                                    padding: "10px 20px",
                                    backgroundColor: "#dc3545",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "6px",
                                    cursor:
                                        cancellingId ===
                                        booking.id
                                            ? "not-allowed"
                                            : "pointer",
                                    fontSize: "15px",
                                    opacity:
                                        cancellingId ===
                                        booking.id
                                            ? 0.6
                                            : 1
                                }}
                            >
                                {cancellingId === booking.id
                                    ? "Cancelling..."
                                    : "Cancel Booking"}
                            </button>

                        </div>
                    ))}

                </div>
            )}

        </div>
    );
}

export default Bookings;