package com.rentify.rentify.controller;
import com.rentify.rentify.dto.MessageDTO;
import com.rentify.rentify.repository.Messages;
import com.rentify.rentify.repository.Users;
import com.rentify.rentify.service.EmailService;
import com.rentify.rentify.service.MessageService;
import com.rentify.rentify.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "*")
public class MessageController {

    private final MessageService messageService;
    private final EmailService emailService;

    @Autowired
    public MessageController(MessageService messageService, EmailService emailService) {
        this.messageService = messageService;
        this.emailService = emailService;
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody MessageDTO messageDTO) {
        try {
            Messages savedMessage = messageService.saveMessage(messageDTO);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Message sent successfully"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Error sending message: " + e.getMessage()
            ));
        }
    }

    @GetMapping("/list")
    public ResponseEntity<?> getUserMessages(@RequestParam String email) {
        try {
            List<Messages> messages = messageService.getUserMessages(email);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "messages", messages
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Error getting messages: " + e.getMessage()
            ));
        }
    }
}
