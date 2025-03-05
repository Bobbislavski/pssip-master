package com.rentify.rentify.repository;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NonNull;

import java.sql.Timestamp;

@Entity
@Data
public class SearchCriteria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int criteria_id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private Users user;

    @ManyToOne
    @JoinColumn(name = "guest_id", nullable = true)
    private Guests guest;

    private String region;
    private double minPrice;
    private double maxPrice;
    private int minRooms;
    private int maxRooms;
    private String propertyType;
    private Timestamp created_at;
    private Timestamp updated_at;

}
