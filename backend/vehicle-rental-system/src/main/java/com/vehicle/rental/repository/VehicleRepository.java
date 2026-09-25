package com.vehicle.rental.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vehicle.rental.entity.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

}