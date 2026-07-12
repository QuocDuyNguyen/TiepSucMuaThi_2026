package com.tiepsucomuathi.backend.entity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDateTime;
@Entity
@Table(name = "volunteer_messages")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class VolunteerMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_id",nullable = false)
    private Volunteer receiver;

    @Column(name = "sender_name",length = 100, nullable = false)
    private String senderName;

    @Column(name = "sender_code",length = 50)
    private String senderCode;

    @Column(name ="sender_verified", nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean senderVerified;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
