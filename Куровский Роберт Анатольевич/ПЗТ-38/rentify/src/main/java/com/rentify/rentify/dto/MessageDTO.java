package com.rentify.rentify.dto;

import lombok.Data;

@Data
public class MessageDTO {
    private String email;
    private String senderName;
    private String subject;
    private String text;
    public String getText() {
        return text;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getSubject() {
        return subject;
    }

    public String getSenderName() {
        return senderName;
    }
}
