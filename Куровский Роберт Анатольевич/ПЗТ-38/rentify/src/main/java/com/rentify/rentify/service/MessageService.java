package com.rentify.rentify.service;

import com.rentify.rentify.dto.MessageDTO;
import com.rentify.rentify.repository.MessageRepository;
import com.rentify.rentify.repository.Messages;
import com.rentify.rentify.repository.UserRepository;
import com.rentify.rentify.repository.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class MessageService {

    @Autowired
    private final MessageRepository messageRepository;
    @Autowired
    private final UserService userService;
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private final UserRepository userRepository;
    public MessageService(MessageRepository messageRepository, UserService userService, JavaMailSender mailSender, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.userService = userService;
        this.mailSender = mailSender;
        this.userRepository = userRepository;
    }

    public List<Messages> getUserMessages(String email) {
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return messageRepository.findByUserOrderByCreatedAtDesc(user);
    }
    public Messages saveMessage(MessageDTO messageDTO) {

        Users user = userRepository.findByEmail(messageDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Messages message = new Messages();
        message.setSenderName(messageDTO.getSenderName());
        message.setSubject(messageDTO.getSubject());
        message.setText(messageDTO.getText());
        message.setSenderEmail(messageDTO.getEmail());
        message.setRecipientEmail("robertkurovsci23@gmail.com");
        message.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        message.setUser(user);
        Messages savedMessage = messageRepository.save(message);


        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(messageDTO.getEmail());
            mailMessage.setTo("robertkurovsci23@gmail.com");
            mailMessage.setSubject(messageDTO.getSubject());
            mailMessage.setText(
                    "От: " + messageDTO.getSenderName() + " (" + messageDTO.getEmail() + ")\n\n" +
                            messageDTO.getText()
            );

            mailSender.send(mailMessage);
        } catch (MailException e) {
            e.printStackTrace();
        }

        return savedMessage;
    }

}