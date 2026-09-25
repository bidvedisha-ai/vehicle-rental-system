package com.vehicle.rental.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.vehicle.rental.entity.Vehicle;
import com.vehicle.rental.repository.VehicleRepository;

@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    // Add vehicle
    public Vehicle saveVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    // Get all vehicles
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    // Get vehicle by ID
    public Vehicle getVehicleById(Long id) {
        return vehicleRepository.findById(id).orElse(null);
    }

    // Update vehicle
    public Vehicle updateVehicle(Long id, Vehicle vehicle) {

        Vehicle existingVehicle =
                vehicleRepository.findById(id).orElse(null);

        if (existingVehicle != null) {

            existingVehicle.setVehicleNumber(vehicle.getVehicleNumber());
            existingVehicle.setBrand(vehicle.getBrand());
            existingVehicle.setModel(vehicle.getModel());
            existingVehicle.setType(vehicle.getType());
            existingVehicle.setFuelType(vehicle.getFuelType());
            existingVehicle.setTransmission(vehicle.getTransmission());
            existingVehicle.setSeats(vehicle.getSeats());
            existingVehicle.setPricePerDay(vehicle.getPricePerDay());
            existingVehicle.setStatus(vehicle.getStatus());

            return vehicleRepository.save(existingVehicle);
        }

        return null;
    }

    // Delete vehicle
    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }
}