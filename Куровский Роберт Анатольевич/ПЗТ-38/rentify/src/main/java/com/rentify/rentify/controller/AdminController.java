package com.rentify.rentify.controller;

import com.rentify.rentify.repository.Bookings;
import com.rentify.rentify.repository.Payments;
import com.rentify.rentify.repository.Properties;
import com.rentify.rentify.repository.Users;
import com.rentify.rentify.service.BookingService;
import com.rentify.rentify.service.PaymentService;
import com.rentify.rentify.service.PropertyService;
import com.rentify.rentify.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.sql.Timestamp;
import java.util.*;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:8080")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private PropertyService propertyService;

    @Autowired
    private BookingService bookingService;

    @Autowired
    private PaymentService paymentService;

    public AdminController(UserService userService, PropertyService propertyService, BookingService bookingService, PaymentService paymentService) {
        this.userService = userService;
        this.propertyService = propertyService;
        this.bookingService = bookingService;
        this.paymentService = paymentService;
    }

    @GetMapping("/properties")
    public ResponseEntity<List<Properties>> getAllProperties() {
        return ResponseEntity.ok(propertyService.findAll());
    }

    @GetMapping("/users")
    public ResponseEntity<List<Users>> getAllUsers() {
        List<Users> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/dashboard-stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("usersCount", userService.getTotalUsers());
        stats.put("propertiesCount", propertyService.count());
        stats.put("bookingsCount", bookingService.count());
        stats.put("totalRevenue", bookingService.calculateTotalRevenue());
        return ResponseEntity.ok(stats);
    }

    @PostMapping("/users")
    public ResponseEntity<?> createUser(@RequestBody Users user) {
        try {
            System.out.println("Received user: " + user);
            if (user.getPassword() == null || user.getPassword().isEmpty()) {
                user.setPassword("defaultpassword");
            }
            Users savedUser = userService.save(user);
            System.out.println("Saved user: " + savedUser);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка при добавлении пользователя: " + e.getMessage());
        }
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Integer id, @RequestBody Users updatedUser) {
        try {
            Users existingUser = userService.findById(id);
            if (existingUser == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Пользователь не найден");
            }

            existingUser.setUsername(updatedUser.getUsername());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPhone_number(updatedUser.getPhone_number());

            Users savedUser = userService.save(existingUser);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка при обновлении пользователя: " + e.getMessage());
        }
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id) {
        try {
            userService.deleteById(id);
            return ResponseEntity.ok(Map.of("success", true, "message", "Пользователь удален"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Ошибка при удалении пользователя: " + e.getMessage()));
        }
    }


    @PutMapping("/properties/{id}")
    public ResponseEntity<?> updateProperty(@PathVariable int id, @RequestBody Properties updatedProperty) {
        try {
            Properties property = propertyService.findById(id)
                    .orElseThrow(() -> new RuntimeException("Property not found"));

            property.setTitle(updatedProperty.getTitle());
            property.setDescription(updatedProperty.getDescription());
            property.setPrice(updatedProperty.getPrice());
            property.setRegion(updatedProperty.getRegion());
            property.setAddress(updatedProperty.getAddress());
            property.setType(updatedProperty.getType());
            property.setRooms(updatedProperty.getRooms());
            property.setArea(updatedProperty.getArea());
            property.setMaxGuests(updatedProperty.getMaxGuests());
            property.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

            Properties savedProperty = propertyService.save(property);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Property updated successfully");
            response.put("property", savedProperty);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }


    @DeleteMapping("/properties/{id}")
    public ResponseEntity<?> deleteProperty(@PathVariable int id) {
        try {
            propertyService.deleteById(id);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Property deleted successfully");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<Bookings>> getAllBookings() {
        return ResponseEntity.ok(bookingService.findAll());
    }

    @GetMapping("/payments")
    public ResponseEntity<List<Payments>> getAllPayments() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }

    @PostMapping("/properties")
    public ResponseEntity<?> createProperty(@RequestBody Properties property) {
        Properties savedProperty = propertyService.save(property);
        return ResponseEntity.ok(savedProperty);
    }
}

