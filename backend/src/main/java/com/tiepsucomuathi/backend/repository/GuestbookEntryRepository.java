package com.tiepsucomuathi.backend.repository;

import com.tiepsucomuathi.backend.entity.GuestbookEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GuestbookEntryRepository extends JpaRepository<GuestbookEntry, Long> {
    List<GuestbookEntry> findAllByOrderByCreatedAtDesc();
}
