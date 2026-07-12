package com.tiepsucomuathi.backend.service;

import com.tiepsucomuathi.backend.entity.Journey;
import com.tiepsucomuathi.backend.repository.JourneyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JourneyService {

    private final JourneyRepository journeyRepo;

    public List<Journey> getAll() {
        return journeyRepo.findAllByOrderByDisplayOrderAsc();
    }
}