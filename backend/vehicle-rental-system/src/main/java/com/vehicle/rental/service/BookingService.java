package com.vehicle.rental.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vehicle.rental.dto.BookingRequest;
import com.vehicle.rental.entity.Booking;
import com.vehicle.rental.entity.User;
import com.vehicle.rental.entity.Vehicle;
import com.vehicle.rental.repository.BookingRepository;
import com.vehicle.rental.repository.UserRepository;
import com.vehicle.rental.repository.VehicleRepository;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final VehicleRepository vehicleRepository;

    public BookingService(
            BookingRepository bookingRepository,
            UserRepository userRepository,
            VehicleRepository vehicleRepository) {

        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.vehicleRepository = vehicleRepository;
    }

    // CREATE BOOKING
    @Transactional
    public Booking saveBooking(BookingRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Vehicle vehicle = vehicleRepository.findById(request.getVehicleId())
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        // Check vehicle availability
        if (vehicle.getStatus() != null
                && vehicle.getStatus().equalsIgnoreCase("BOOKED")) {

            throw new RuntimeException("Vehicle is already booked");
        }

        LocalDate pickupDate = request.getPickupDate();
        LocalDate returnDate = request.getReturnDate();

        if (pickupDate == null || returnDate == null) {
            throw new RuntimeException(
                    "Pickup date and return date are required");
        }

        if (returnDate.isBefore(pickupDate)) {
            throw new RuntimeException(
                    "Return date cannot be before pickup date");
        }

        // Calculate number of days
        long days = ChronoUnit.DAYS.between(
                pickupDate,
                returnDate);

        if (days == 0) {
            days = 1;
        }

        // Calculate total amount
        double totalAmount =
                days * vehicle.getPricePerDay();

        // Create booking
        Booking booking = new Booking();

        booking.setUser(user);
        booking.setVehicle(vehicle);
        booking.setPickupDate(pickupDate);
        booking.setReturnDate(returnDate);
        booking.setTotalAmount(totalAmount);
        booking.setBookingStatus("CONFIRMED");

        // Change vehicle status
        vehicle.setStatus("BOOKED");

        vehicleRepository.save(vehicle);

        // Save booking
        return bookingRepository.save(booking);
    }

    // GET ALL BOOKINGS
    public List<Booking> getAllBookings() {

        return bookingRepository.findAll();
    }

    // GET BOOKING BY ID
    public Booking getBookingById(Long id) {

        return bookingRepository.findById(id)
                .orElse(null);
    }

    // GET BOOKINGS BY USER
    public List<Booking> getBookingsByUser(Long userId) {

        return bookingRepository.findByUserId(userId);
    }

    // CANCEL BOOKING
    @Transactional
    public Booking cancelBooking(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElse(null);

        if (booking == null) {
            return null;
        }

        // Make vehicle available again
        Vehicle vehicle = booking.getVehicle();

        if (vehicle != null) {

            vehicle.setStatus("AVAILABLE");

            vehicleRepository.save(vehicle);
        }

        // Change booking status
        booking.setBookingStatus("CANCELLED");

        return bookingRepository.save(booking);
    }
}