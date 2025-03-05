package com.rentify.rentify.repository;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Data
public class Reviews {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reviewId;

    @ManyToOne
    @JoinColumn(name = "property_id", nullable = false)
    private Properties property;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private Users user;

    @ManyToOne
    @JoinColumn(name = "guest_id", nullable = true)
    private Guests guest;

    private int rating;
    private String comment;
    private Timestamp createdAt;

}
