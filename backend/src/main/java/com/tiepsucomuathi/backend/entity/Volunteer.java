package com.tiepsucomuathi.backend.entity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDateTime;
@Entity
@Table(name = "volunteers")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Volunteer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false, length=150)
    private String slug;
    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;
    @Column(name = "birth_year")
    private Integer birthYear;
    @Column(name = "role_name", length = 150)
    private String roleName;
    @Column(name = "avatar_url", length = 1000)
    private String avatarUrl;
    @Column(name = "cover_url", length = 1000)
    private String coverUrl;
    @Column(columnDefinition = "TEXT")
    private String quote;
    @Column(columnDefinition = "TEXT")
    private String bio;
    @Column(nullable = false)
    private Boolean featured = false;
    @Column(name = "display_order")
    private Integer displayOrder = 0;
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
