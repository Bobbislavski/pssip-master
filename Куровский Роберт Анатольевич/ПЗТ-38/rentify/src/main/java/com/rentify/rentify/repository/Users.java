package com.rentify.rentify.repository;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
@Table(name = "users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("user_id")
    private int user_id;
    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false, columnDefinition = "varchar(255) default 'defaultpassword'")
    private String password;
    private String phone_number;
    @Column(nullable = false)
    private String role = "user";
    @Column(name = "created_at", updatable = false)
    private Timestamp created_at = new Timestamp(System.currentTimeMillis());
    private Timestamp updated_at;


    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    public void setCreatedAt(Timestamp timestamp) {
        this.created_at = timestamp;
    }

    public void setUpdatedAt(Timestamp timestamp) {
        this.updated_at = timestamp;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public String getUsername() {
        return username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}