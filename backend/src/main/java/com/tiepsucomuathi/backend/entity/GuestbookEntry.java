package com.tiepsucomuathi.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDateTime;

@Entity
@Table(name = "guestbook_entries")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class GuestbookEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String type; // 'sticky', 'polaroid', 'leader', 'autographs', 'stat'

    @Column(length = 50)
    private String bg;

    @Column(length = 20)
    private String rotation;

    @Column(length = 50)
    private String span;

    @Column(columnDefinition = "TEXT")
    private String text;

    @Column(length = 250)
    private String author;

    @Column(name = "image_url", length = 1000)
    private String imageUrl;

    @Column(name = "date_str", length = 50)
    private String dateStr;

    @Column(name = "raw_name", length = 150)
    private String rawName;

    @Column(name = "raw_role", length = 150)
    private String rawRole;

    @Column(name = "raw_message", columnDefinition = "TEXT")
    private String rawMessage;

    @Column(name = "raw_image", length = 1000)
    private String rawImage;

    // Fields for autographs type
    @Column(length = 150)
    private String title;

    @Column(name = "items_json", columnDefinition = "TEXT")
    private String itemsJson; // Store items as JSON string

    // Fields for stat type
    @Column(name = "stat_value", length = 100)
    private String statValue;

    @Column(name = "stat_label", length = 150)
    private String statLabel;

    // Fields for leader type
    @Column(length = 500)
    private String avatar;

    @Column(length = 150)
    private String name;

    @Column(length = 150)
    private String role;

    // JWT Creator fields
    @Column(name = "creator_role", length = 20)
    private String creatorRole;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_user_id")
    private User creatorUser;

    @Column(name = "creator_guest_uuid", length = 100)
    private String creatorGuestUuid;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
