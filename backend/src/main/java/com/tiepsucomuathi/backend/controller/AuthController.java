package com.tiepsucomuathi.backend.controller;

import com.tiepsucomuathi.backend.entity.User;
import com.tiepsucomuathi.backend.repository.UserRepository;
import com.tiepsucomuathi.backend.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        User user = userRepository.findByUsername(req.username())
                .orElse(null);

        if (user == null || !passwordEncoder.matches(req.password(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Tên đăng nhập hoặc mật khẩu không chính xác"));
        }

        Long volunteerId = user.getVolunteer() != null ? user.getVolunteer().getId() : null;
        String token = jwtUtils.generateToken(user.getUsername(), user.getRole(), user.getId());

        return ResponseEntity.ok(new AuthResponse(token, user.getUsername(), user.getRole(), user.getId(), volunteerId));
    }

    @PostMapping("/guest")
    public ResponseEntity<?> getGuestToken() {
        String guestUuid = UUID.randomUUID().toString();
        String token = jwtUtils.generateGuestToken(guestUuid);
        return ResponseEntity.ok(new GuestResponse(token, guestUuid));
    }

    public record LoginRequest(String username, String password) {}
    public record AuthResponse(String token, String username, String role, Long userId, Long volunteerId) {}
    public record GuestResponse(String token, String guestUuid) {}
}
