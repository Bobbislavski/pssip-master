package com.rentify.rentify.repository;


import jakarta.persistence.*;
import lombok.Data;
import java.sql.Timestamp;

@Entity
@Data
public class Favorites {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int favoriteId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private Users user;

    @ManyToOne
    @JoinColumn(name = "guest_id", nullable = true)
    private Guests guest;

    @ManyToOne
    @JoinColumn(name = "property_id", nullable = false)
    private Properties property;

    private Timestamp createdAt;
}
