package com.rentify.rentify.repository;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table (name = "messages")
public class Messages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @Column(nullable = false)
    private String text;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(nullable = false)
    private String subject;

    @Column(name = "sender_email", nullable = false)
    private String senderEmail;

    @Column(name = "recipient_email", nullable = false)
    private String recipientEmail;

    @Column(name = "sender_name")
    private String senderName;


    public String getSenderName() {
        return senderName;
    }

    public String getSenderEmail() {
        return senderEmail;
    }

    public void setSenderEmail(String senderEmail) {
        this.senderEmail = senderEmail;
    }

    public String getRecipientEmail() {
        return recipientEmail;
    }

    public void setRecipientEmail(String recipientEmail) {
        this.recipientEmail = recipientEmail;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Users getUser() {
        return user;
    }

    public String getSubject() {
        return subject;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public Long getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public void setSubject(String subject) {this.subject = subject;}
    public Timestamp getCreatedAt() {
        return createdAt;
    }
    public void setText(String text) {
        this.text = text;
    }

    public void setUser(Users user) {
        this.user = user;
    }
    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }
}
