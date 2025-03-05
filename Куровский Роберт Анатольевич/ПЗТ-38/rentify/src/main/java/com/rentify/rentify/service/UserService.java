package com.rentify.rentify.service;

import com.rentify.rentify.dto.UpdateUserDTO;
import com.rentify.rentify.repository.UserRepository;
import com.rentify.rentify.repository.Users;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;

import java.sql.Timestamp;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final MessageService messageService;

    @Autowired
    public UserService(UserRepository userRepository, @Lazy MessageService messageService) {
        this.userRepository = userRepository;
        this.messageService = messageService;
    }

    public Users registerUser(Users user) {
        Timestamp now = new Timestamp(System.currentTimeMillis());
        user.setCreatedAt(now);
        user.setUpdatedAt(now);
        if (user.getRole() == null) {
            user.setRole("user");
        }
        return userRepository.save(user);
    }

    public Users authAndGetUser(String username, String password) {
        Users user = userRepository.findByUsername(username)
                .orElse(userRepository.findByEmail(username).orElse(null));
        if (user != null && password.equals(user.getPassword())) {
            return user;
        }
        return null;
    }

    public Users findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));
    }

    public Users findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Пользователь с именем " + username + " не найден"));
    }

    public Users findById(Integer id) {
        return userRepository.findById(id).orElse(null);
    }

    public Users updateUser(UpdateUserDTO updateUserDTO) {
        Users user = userRepository.findByEmail(updateUserDTO.getOldEmail())
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));

        user.setUsername(updateUserDTO.getUsername());
        user.setEmail(updateUserDTO.getEmail());
        user.setPhone_number(updateUserDTO.getPhone_number());
        user.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        return userRepository.save(user);
    }

    public Users updateUserById(Integer id, Users updatedUser) {
        Users user = findById(id);
        user.setUsername(updatedUser.getUsername());
        user.setPhone_number(updatedUser.getPhone_number());
        user.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        return userRepository.save(user);
    }

    public void deleteUser(String email) {
        Users user = findByEmail(email);
        if (user != null) {
            userRepository.delete(user);
            if (userRepository.findByEmail(email).isPresent()) {
                throw new RuntimeException("Ошибка: пользователь не был удален");
            }
        } else {
            throw new RuntimeException("Пользователь не найден");
        }
    }
    public void deleteById(Integer id) {
        userRepository.deleteById(id);
    }
    public boolean isAdmin(String email) {
        Users user = findByEmail(email);
        return "admin".equals(user.getRole());
    }

    public Long getTotalUsers() {
        return userRepository.count();
    }

    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }

    public Users save(Users user) {
        if (user.getUsername() == null || user.getEmail() == null) {
            throw new IllegalArgumentException("Имя пользователя и email обязательны");
        }
        user.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        return userRepository.save(user);
    }
}