import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Vehicles from "./pages/Vehicles.jsx";
import Booking from "./pages/Booking.jsx";
import Bookings from "./pages/Bookings.jsx";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/vehicles" element={<Vehicles />} />

                <Route path="/booking" element={<Booking />} />

                <Route path="/bookings" element={<Bookings />} />

            </Routes>

        </BrowserRouter>
    );
}

export default App;