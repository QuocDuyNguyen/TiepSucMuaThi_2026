package com.tiepsucomuathi.backend.controller;

import com.tiepsucomuathi.backend.entity.Journey;
import com.tiepsucomuathi.backend.service.JourneyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/journeys")
@RequiredArgsConstructor
public class JourneyController {

    private final JourneyService journeyService;

    @GetMapping
    public ResponseEntity<List<Journey>> getAll() {
        return ResponseEntity.ok(journeyService.getAll());
    }
}