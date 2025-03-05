package com.rentify.rentify.controller;

import com.rentify.rentify.dto.UpdateUserDTO;
import com.rentify.rentify.repository.Users;
import com.rentify.rentify.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Users user) {
        try {
            System.out.println("Получены данные для регистрации:");
            System.out.println("Username: " + user.getUsername());
            System.out.println("Email: " + user.getEmail());
            System.out.println("Phone: " + user.getPhone_number());
            Users registeredUser = userService.registerUser(user);
            return ResponseEntity.ok()
                    .body("{\"success\": true, \"message\": \"Пользователь зарегистрирован\"}");
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body("{\"success\": false, \"message\": \"Ошибка при регистрации: " + e.getMessage() + "\"}");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String username, @RequestParam String password) {
        try {
            Users user = userService.authAndGetUser(username, password);
            if (user != null) {
                return ResponseEntity.ok()
                        .body(Map.of(
                                "success", true,
                                "message", "Успешная авторизация",
                                "role", user.getRole(),
                                "username", user.getUsername()
                        ));
            } else {
                return ResponseEntity.status(401)
                        .body(Map.of(
                                "success", false,
                                "message", "Неверный email или пароль"
                        ));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of(
                            "success", false,
                            "message", "Ошибка при входе: " + e.getMessage()
                    ));
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(@RequestParam String email) {
        try {
            Users user = userService.findByEmail(email);
            if (user != null) {
                return ResponseEntity.ok(Map.of(
                        "success", true,
                        "user", Map.of(
                                "username", user.getUsername(),
                                "email", user.getEmail(),
                                "phone_number", user.getPhone_number(),
                                "role", user.getRole()
                        )
                ));
            } else {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "Пользователь не найден"
                ));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Ошибка при получении профиля: " + e.getMessage()
            ));
        }
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody UpdateUserDTO updateUserDTO) {
        try {
            if (updateUserDTO.getOldEmail() == null || updateUserDTO.getOldEmail().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Email не может быть пустым"
                ));
            }
            
            Users user = userService.updateUser(updateUserDTO);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Профиль успешно обновлен",
                "user", user
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Ошибка при обновлении: " + e.getMessage()
            ));
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser(@RequestParam String email) {
        try {
            if (email == null || email.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Email не может быть пустым"
                ));
            }
            
            userService.deleteUser(email);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Аккаунт успешно удален"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Ошибка при удалении: " + e.getMessage()
            ));
        }
    }

    @PostMapping("/api/users/update-profile")
    public ResponseEntity<?> updateUserProfile(@RequestBody UpdateUserDTO updateUserDTO) {

        try {
            Users user = userService.updateUser(updateUserDTO);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Профиль обновлен"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Ошибка при обновлении: " + e.getMessage()
            ));
        }
    }
}