package com.olimba.miniapp.controller;

import com.olimba.miniapp.entity.UserEntity;
import com.olimba.miniapp.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") //for react frontend, add ni nato later
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserEntity user) {
        return ResponseEntity.ok(userService.registerUser(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserEntity loginRequest) {
        UserEntity user = userService.findByEmail(loginRequest.getEmail());
        if (user != null && userService.checkPassword(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.ok(user); // In a real app, return a JWT token here
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestParam String email) {
        // Simplified for Lab 1; usually uses SecurityContext
        return ResponseEntity.ok(userService.findByEmail(email));
    }
}