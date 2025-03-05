package com.rentify.rentify.repository;


import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Data
public class Payments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    @ManyToOne
    @JoinColumn(name = "booking_id", nullable = false)
    private Bookings booking;

    @Column(nullable = false)
    private BigDecimal amount;
    @Column(name = "payment_method")
    private String paymentMethod;
    @Column(name = "status")
    private String paymentStatus;
    @Column(name = "created_at")
    private Timestamp createdAt;
}
