package com.tiepsucomuathi.backend.controller;
import com.tiepsucomuathi.backend.dto.request.GratitudeRequest;
import com.tiepsucomuathi.backend.dto.response.MessageResponse;
import com.tiepsucomuathi.backend.service.GratitudeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/gratitudes")
@RequiredArgsConstructor
public class GratitudeController {
    private final GratitudeService gratitudeService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(gratitudeService.getAll());
    }
    @PostMapping
    public ResponseEntity<MessageResponse> send(@Valid @RequestBody GratitudeRequest req){
        gratitudeService.send(req);
        return ResponseEntity.ok(new MessageResponse("Gratitude message sent successfully"));
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody GratitudeRequest req) {
        gratitudeService.update(id, req);
        return ResponseEntity.ok(new MessageResponse("Gratitude message updated successfully"));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        gratitudeService.delete(id);
        return ResponseEntity.ok(new MessageResponse("Gratitude message deleted successfully"));
    }
}
