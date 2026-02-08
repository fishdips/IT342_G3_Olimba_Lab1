package com.olimba.miniapp.controller;

import com.olimba.miniapp.entity.UserEntity;
import com.olimba.miniapp.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserEntity user) {
        if (userService.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.status(409).body("Email already exists");
        }
        UserEntity saved = userService.registerUser(user);
        return ResponseEntity.ok(sanitize(saved));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserEntity loginRequest) {
        UserEntity user = userService.findByEmail(loginRequest.getEmail());
        if (user != null && userService.checkPassword(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.ok(sanitize(user)); 
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestParam String email) {
        return ResponseEntity.ok(sanitize(userService.findByEmail(email)));
    }

    private UserEntity sanitize(UserEntity user) {
        if (user == null) return null;
        UserEntity safe = new UserEntity();
        safe.setId(user.getId());
        safe.setEmail(user.getEmail());
        safe.setFullName(user.getFullName());
        return safe;
    }
}