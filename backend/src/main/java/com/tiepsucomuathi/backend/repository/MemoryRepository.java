package com.tiepsucomuathi.backend.repository;
import com.tiepsucomuathi.backend.entity.Memory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface MemoryRepository extends JpaRepository<Memory, Long> {
    List<Memory> findByVolunteerIdOrderByDisplayOrderAsc(Long volunteerId);
}
