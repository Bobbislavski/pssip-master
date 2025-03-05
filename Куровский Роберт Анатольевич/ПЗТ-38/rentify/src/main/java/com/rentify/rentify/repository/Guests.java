package com.rentify.rentify.repository;

import jakarta.persistence.*;
import lombok.Data;
import java.sql.Timestamp;

@Entity
@Data
public class Guests {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int guestId;
    private String sessionId;
    private String email;
    private String phoneNumber;
    private Timestamp createdAt;
}
