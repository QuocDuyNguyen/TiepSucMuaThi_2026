package com.tiepsucomuathi.backend.service;
import com.tiepsucomuathi.backend.dto.request.VolunteerMessageRequest;
import com.tiepsucomuathi.backend.entity.Volunteer;
import com.tiepsucomuathi.backend.entity.VolunteerMessage;
import com.tiepsucomuathi.backend.repository.VolunteerMessageRepository;
import com.tiepsucomuathi.backend.repository.VolunteerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class VolunteerMessageService {
    private final VolunteerMessageRepository messageRepo;
    private final VolunteerRepository volunteerRepo;
    public List<VolunteerMessage> getMessages(Long receiverId) {
        return messageRepo.findByReceiverIdOrderByCreatedAtDesc(receiverId);
    }
    public VolunteerMessage send(VolunteerMessageRequest req) {
        Volunteer receiver = volunteerRepo.findById(req.getReceiverId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thành viên nhận lời nhắn"));
        boolean verified = false;
        String resolvedName = req.getSenderName(); 
        VolunteerMessage msg = VolunteerMessage.builder()
                .receiver(receiver)
                .senderName(resolvedName)
                .senderCode(req.getSenderCode())
                .senderVerified(verified)
                .content(req.getContent())
                .build();
        return messageRepo.save(msg);
    }
}