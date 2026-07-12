package com.tiepsucomuathi.backend.entity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
@Entity
@Table(name = "gallery_photos")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class GalleryPhoto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "image_url", nullable = false, length = 1000)
    private String imageUrl;

    @Column(length = 200)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String detail;

    @Column(length = 50)
    private String category;

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
