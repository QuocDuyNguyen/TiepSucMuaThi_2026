package com.tiepsucomuathi.backend.controller;

import com.tiepsucomuathi.backend.entity.GuestbookEntry;
import com.tiepsucomuathi.backend.entity.User;
import com.tiepsucomuathi.backend.repository.GuestbookEntryRepository;
import com.tiepsucomuathi.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/guestbook")
@RequiredArgsConstructor
public class GuestbookController {

    private final GuestbookEntryRepository guestbookRepo;
    private final UserRepository userRepo;

    @GetMapping
    public ResponseEntity<List<GuestbookEntry>> getAll() {
        return ResponseEntity.ok(guestbookRepo.findAllByOrderByCreatedAtDesc());
    }

    @PostMapping
    public ResponseEntity<GuestbookEntry> create(@RequestBody GuestbookEntry entry) {
        String creatorRole = "ROLE_GUEST";
        User creatorUser = null;
        String creatorGuestUuid = null;

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getCredentials() instanceof Map) {
            Map<?, ?> userDetails = (Map<?, ?>) auth.getCredentials();
            String role = (String) userDetails.get("role");
            creatorRole = role;
            if ("ROLE_ADMIN".equals(role) || "ROLE_USER".equals(role)) {
                Long userId = (Long) userDetails.get("userId");
                creatorUser = userRepo.findById(userId).orElse(null);
            } else if ("ROLE_GUEST".equals(role)) {
                creatorGuestUuid = (String) userDetails.get("guestUuid");
            }
        }

        entry.setCreatorRole(creatorRole);
        entry.setCreatorUser(creatorUser);
        entry.setCreatorGuestUuid(creatorGuestUuid);

        return ResponseEntity.ok(guestbookRepo.save(entry));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody GuestbookEntry updated) {
        GuestbookEntry existing = guestbookRepo.findById(id).orElse(null);
        if (existing == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Không tìm thấy lưu bút"));
        }

        if (!isOwner(existing)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "Bạn không có quyền sửa lưu bút này"));
        }

        existing.setBg(updated.getBg());
        existing.setRotation(updated.getRotation());
        existing.setSpan(updated.getSpan());
        existing.setText(updated.getText());
        existing.setAuthor(updated.getAuthor());
        existing.setImageUrl(updated.getImageUrl());
        existing.setRawName(updated.getRawName());
        existing.setRawRole(updated.getRawRole());
        existing.setRawMessage(updated.getRawMessage());
        existing.setRawImage(updated.getRawImage());
        
        // For autograph type
        existing.setTitle(updated.getTitle());
        existing.setItemsJson(updated.getItemsJson());

        // For stat type
        existing.setStatValue(updated.getStatValue());
        existing.setStatLabel(updated.getStatLabel());

        // For leader type
        existing.setAvatar(updated.getAvatar());
        existing.setName(updated.getName());
        existing.setRole(updated.getRole());

        return ResponseEntity.ok(guestbookRepo.save(existing));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        GuestbookEntry existing = guestbookRepo.findById(id).orElse(null);
        if (existing == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Không tìm thấy lưu bút"));
        }

        if (!isOwner(existing)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "Bạn không có quyền xóa lưu bút này"));
        }

        guestbookRepo.delete(existing);
        return ResponseEntity.ok(Map.of("success", true, "message", "Xóa lưu bút thành công"));
    }

    private boolean isOwner(GuestbookEntry entry) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !(auth.getCredentials() instanceof Map)) {
            return false;
        }

        Map<?, ?> userDetails = (Map<?, ?>) auth.getCredentials();
        String role = (String) userDetails.get("role");

        if ("ROLE_ADMIN".equals(role)) {
            return true;
        }

        if (entry.getCreatorRole() == null) {
            // Pre-seeded entries with no creator can only be edited/deleted by ADMIN
            return false;
        }

        if ("ROLE_USER".equals(role) && "ROLE_USER".equals(entry.getCreatorRole())) {
            Long userId = (Long) userDetails.get("userId");
            return entry.getCreatorUser() != null && entry.getCreatorUser().getId().equals(userId);
        }

        if ("ROLE_GUEST".equals(role) && "ROLE_GUEST".equals(entry.getCreatorRole())) {
            String guestUuid = (String) userDetails.get("guestUuid");
            return entry.getCreatorGuestUuid() != null && entry.getCreatorGuestUuid().equals(guestUuid);
        }

        return false;
    }
}
