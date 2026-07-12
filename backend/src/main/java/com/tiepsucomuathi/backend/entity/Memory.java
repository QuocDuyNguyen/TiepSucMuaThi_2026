package com.tiepsucomuathi.backend.entity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDate;
import java.time.LocalDateTime;
@Entity
@Table(name = "memories")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Memory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "volunteer_id", nullable = false)
    private Volunteer volunteer;
    @Column(length = 255)
    private String title;
    @Column(columnDefinition = "TEXT")
    private String description;
    @Column(name = "image_url", length = 1000)
    private String imageUrl;
    @Column(name = "memory_date")
    private LocalDate memoryDate;
    @Column(name = "display_order")
    private Integer displayOrder = 0;
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
