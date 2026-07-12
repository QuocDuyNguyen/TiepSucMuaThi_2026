package com.tiepsucomuathi.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.tiepsucomuathi.backend.entity.VolunteerMessage;
import java.util.List;
public interface VolunteerMessageRepository extends JpaRepository<VolunteerMessage, Long> {
    List<VolunteerMessage> findByReceiverIdOrderByCreatedAtDesc(Long receiverId);
}
