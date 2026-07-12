package com.tiepsucomuathi.backend.service;

import com.tiepsucomuathi.backend.dto.request.CreateUserRequest;
import com.tiepsucomuathi.backend.dto.response.UserDto;
import com.tiepsucomuathi.backend.entity.User;
import com.tiepsucomuathi.backend.entity.Volunteer;
import com.tiepsucomuathi.backend.repository.UserRepository;
import com.tiepsucomuathi.backend.repository.VolunteerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final VolunteerRepository volunteerRepository;
    private final PasswordEncoder passwordEncoder;

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Transactional
    public UserDto createUser(CreateUserRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Tên đăng nhập đã tồn tại!");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        
        String role = request.getRole() != null ? request.getRole() : "ROLE_USER";
        user.setRole(role);

        // If it's a volunteer (ROLE_USER), we can optionally create a volunteer profile
        if ("ROLE_USER".equals(role) && request.getFullName() != null && !request.getFullName().isEmpty()) {
            Volunteer volunteer = new Volunteer();
            volunteer.setFullName(request.getFullName());
            // Create a simple slug from username
            volunteer.setSlug(request.getUsername().toLowerCase().replaceAll("[^a-z0-9]+", "-"));
            volunteer.setFeatured(false);
            volunteer.setDisplayOrder(0);
            volunteer = volunteerRepository.save(volunteer);
            
            user.setVolunteer(volunteer);
        }

        user = userRepository.save(user);
        return mapToDto(user);
    }

    @Transactional
    public UserDto changeRole(Long id, String newRole) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng!"));
        user.setRole(newRole);
        return mapToDto(userRepository.save(user));
    }

    @Transactional
    public UserDto resetPassword(Long id, String newPassword) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng!"));
        user.setPassword(passwordEncoder.encode(newPassword));
        return mapToDto(userRepository.save(user));
    }

    private UserDto mapToDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .role(user.getRole())
                .volunteerId(user.getVolunteer() != null ? user.getVolunteer().getId() : null)
                .volunteerName(user.getVolunteer() != null ? user.getVolunteer().getFullName() : null)
                .createdAt(user.getCreatedAt())
                .build();
    }
}
