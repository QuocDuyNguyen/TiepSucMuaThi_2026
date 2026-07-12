package com.tiepsucomuathi.backend.service;
import com.tiepsucomuathi.backend.dto.request.GratitudeRequest;
import com.tiepsucomuathi.backend.entity.GratitudeMessage;
import com.tiepsucomuathi.backend.entity.Volunteer;
import com.tiepsucomuathi.backend.entity.User;
import com.tiepsucomuathi.backend.repository.GratitudeMessageRepository;
import com.tiepsucomuathi.backend.repository.VolunteerRepository;
import com.tiepsucomuathi.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GratitudeService {
    private final GratitudeMessageRepository gratitudeRepo;
    private final VolunteerRepository volunteerRepo;
    private final UserRepository userRepository;

    public List<GratitudeMessage> getAll(){
        return gratitudeRepo.findAllByOrderByCreatedAtDesc();
    }
    public List<GratitudeMessage> getByVolunteer(Long volunteerId){
        return gratitudeRepo.findByVolunteerIdOrderByCreatedAtDesc(volunteerId);
    }
    public GratitudeMessage send(GratitudeRequest req){
        Volunteer volunteer = volunteerRepo.findById(req.getVolunteerId()).orElseThrow(() -> new RuntimeException("Volunteer not found"));
        boolean verified = false;
        User senderUser = null;
        String guestSessionId = null;

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if(auth != null && auth.getCredentials() instanceof Map){
            Map<?, ?> userDetails = (Map<?, ?>) auth.getCredentials();
            String role = (String) userDetails.get("role");
            if("ROLE_ADMIN".equals(role) || "ROLE_USER".equals(role)){
                Long userId = (Long) userDetails.get("userId");
                senderUser = userRepository.findById(userId).orElse(null);
                verified = true;
            } else if("ROLE_GUEST".equals(role)){
                guestSessionId = (String) userDetails.get("guestUuid");
            }
        }

        GratitudeMessage msg = GratitudeMessage.builder()
                .volunteer(volunteer)
                .senderName(req.getSenderName())
                .content(req.getContent())
                .verified(verified)
                .approved(true)
                .senderUser(senderUser)
                .guestSessionId(guestSessionId)
                .build();
        return gratitudeRepo.save(msg);
    }

    public void update(Long id, GratitudeRequest req) {
        GratitudeMessage msg = gratitudeRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy tin nhắn tri ân"));
        checkOwnership(msg);
        msg.setContent(req.getContent());
        msg.setSenderName(req.getSenderName());
        gratitudeRepo.save(msg);
    }

    public void delete(Long id) {
        GratitudeMessage msg = gratitudeRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy tin nhắn tri ân"));
        checkOwnership(msg);
        gratitudeRepo.delete(msg);
    }

    private void checkOwnership(GratitudeMessage msg) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if(auth == null || !(auth.getCredentials() instanceof Map)){
            throw new RuntimeException("Bạn không có quyền thực hiện hành động này (Chưa đăng nhập)");
        }
        Map<?, ?> userDetails = (Map<?, ?>) auth.getCredentials();
        String role = (String) userDetails.get("role");

        if("ROLE_ADMIN".equals(role)){
            return;
        }
        if("ROLE_USER".equals(role)){
            Long userId = (Long) userDetails.get("userId");
            if(msg.getSenderUser() == null || !msg.getSenderUser().getId().equals(userId)){
                throw new RuntimeException("Bạn không có quyền chỉnh sửa/xóa tin nhắn của người khác");
            }
            return;
        }
        if("ROLE_GUEST".equals(role)){
            String guestUuid = (String) userDetails.get("guestUuid");
            if(msg.getGuestSessionId() == null || !msg.getGuestSessionId().equals(guestUuid)){
                throw new RuntimeException("Bạn không có quyền chỉnh sửa/xóa tin nhắn của người khác");
            }
            return;
        }
        throw new RuntimeException("Hành động không hợp lệ");
    }
}
