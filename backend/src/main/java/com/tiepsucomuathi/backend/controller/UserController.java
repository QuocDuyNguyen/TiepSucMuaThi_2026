package com.tiepsucomuathi.backend.controller;

import com.tiepsucomuathi.backend.dto.request.CreateUserRequest;
import com.tiepsucomuathi.backend.dto.request.ResetPasswordRequest;
import com.tiepsucomuathi.backend.dto.request.UpdateRoleRequest;
import com.tiepsucomuathi.backend.dto.response.UserDto;
import com.tiepsucomuathi.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PostMapping
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody CreateUserRequest request) {
        return ResponseEntity.ok(userService.createUser(request));
    }

    @PutMapping("/{id}/role")
    public ResponseEntity<UserDto> changeRole(@PathVariable Long id, @Valid @RequestBody UpdateRoleRequest request) {
        return ResponseEntity.ok(userService.changeRole(id, request.getRole()));
    }

    @PutMapping("/{id}/password")
    public ResponseEntity<UserDto> resetPassword(@PathVariable Long id, @Valid @RequestBody ResetPasswordRequest request) {
        return ResponseEntity.ok(userService.resetPassword(id, request.getNewPassword()));
    }
}
