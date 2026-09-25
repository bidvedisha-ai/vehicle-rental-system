package com.vehicle.rental.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vehicle.rental.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

}