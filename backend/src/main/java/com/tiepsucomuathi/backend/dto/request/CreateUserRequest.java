package com.tiepsucomuathi.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateUserRequest {
    @NotBlank(message = "Username is required")
    private String username;
    
    @NotBlank(message = "Password is required")
    private String password;
    
    private String fullName; // To generate volunteer profile if needed
    
    private String role; // e.g. ROLE_USER or ROLE_ADMIN
}
