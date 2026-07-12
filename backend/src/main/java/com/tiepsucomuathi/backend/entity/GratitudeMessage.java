package com.tiepsucomuathi.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDateTime;
@Entity
@Table(name = "gratitude_messages")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class GratitudeMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "volunteer_id",nullable = false)
    private Volunteer volunteer;

    @Column(name = "sender_name",length = 100, nullable = false)
    private String senderName;



    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "verified", columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean verified;

     @Column(nullable = false)
     private Boolean approved = false; 

    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_user_id")
    private User senderUser;

    @Column(name = "guest_session_id", length = 100)
    private String guestSessionId;
}
