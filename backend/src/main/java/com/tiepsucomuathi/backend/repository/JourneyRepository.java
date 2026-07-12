package com.tiepsucomuathi.backend.repository;
import com.tiepsucomuathi.backend.entity.Journey;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface JourneyRepository extends JpaRepository<Journey, Long> {
    List<Journey> findAllByOrderByDisplayOrderAsc();
}
