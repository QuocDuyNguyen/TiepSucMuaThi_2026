package com.tiepsucomuathi.backend.controller;

import com.tiepsucomuathi.backend.entity.*;
import com.tiepsucomuathi.backend.repository.*;
import com.tiepsucomuathi.backend.service.VolunteerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/volunteers")
@RequiredArgsConstructor
public class VolunteerController {

    private final VolunteerService volunteerService;
    private final VolunteerRepository volunteerRepo;
    private final MemoryRepository memoryRepo;
    private final GratitudeMessageRepository gratitudeRepo;

    @GetMapping
    public ResponseEntity<List<Volunteer>> getAll(){
        return ResponseEntity.ok(volunteerService.getAll());
    }
    @GetMapping("/{slug}")
    public ResponseEntity<Volunteer> getBySlug(@PathVariable String slug){
        return ResponseEntity.ok(volunteerService.getBySlug(slug));
    }

      @GetMapping("/{id}/memories")
    public ResponseEntity<List<Memory>> getMemories(@PathVariable Long id) {
        return ResponseEntity.ok(memoryRepo.findByVolunteerIdOrderByDisplayOrderAsc(id));
    }
    @GetMapping("/{id}/gratitudes")
    public ResponseEntity<List<GratitudeMessage>> getGratitudes(@PathVariable Long id) {
        return ResponseEntity.ok(gratitudeRepo.findByVolunteerIdOrderByCreatedAtDesc(id));
    }

    @PutMapping("/{id}")
    @org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Volunteer> update(@PathVariable Long id, @RequestBody Volunteer updatedData) {
        return ResponseEntity.ok(volunteerService.update(id, updatedData));
    }
}
