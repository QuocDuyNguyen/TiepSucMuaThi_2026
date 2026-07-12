package com.tiepsucomuathi.backend.controller;
import com.tiepsucomuathi.backend.dto.request.VolunteerMessageRequest;
import com.tiepsucomuathi.backend.dto.response.MessageResponse;
import com.tiepsucomuathi.backend.entity.VolunteerMessage;
import com.tiepsucomuathi.backend.service.VolunteerMessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/volunteer-messages")
@RequiredArgsConstructor
public class VolunteerMessageController {
private final VolunteerMessageService messageService;
    @GetMapping
    public ResponseEntity<List<VolunteerMessage>> getMessages(@RequestParam Long receiverId) {
        return ResponseEntity.ok(messageService.getMessages(receiverId));
    }
    @PostMapping
    public ResponseEntity<MessageResponse> send(@Valid @RequestBody VolunteerMessageRequest req) {
        messageService.send(req);
        return ResponseEntity.ok(new MessageResponse("Message sent successfully"));
    }
}
