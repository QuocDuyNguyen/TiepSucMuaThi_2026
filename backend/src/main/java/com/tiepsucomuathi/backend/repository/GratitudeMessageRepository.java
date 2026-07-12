package com.tiepsucomuathi.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tiepsucomuathi.backend.entity.GratitudeMessage;
import java.util.List;
public interface GratitudeMessageRepository extends JpaRepository<GratitudeMessage, Long> {
     List<GratitudeMessage> findByVolunteerIdOrderByCreatedAtDesc(Long volunteerId);
    
    List<GratitudeMessage> findAllByOrderByCreatedAtDesc();
}
