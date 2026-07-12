package com.tiepsucomuathi.backend.entity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
@Entity
@Table(name = "journeys")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Journey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 255)
    private String title;
    @Column(columnDefinition = "TEXT")
    private String description;
    @Column(name = "image_url", length = 1000)
    private String imageUrl;
    @Column(name = "event_date")
    private LocalDate eventDate;
    @Column(name = "display_order")
    private Integer displayOrder = 0;
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
