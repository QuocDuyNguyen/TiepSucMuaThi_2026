package com.tiepsucomuathi.backend.dto.request;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class VolunteerMessageRequest {
    @NotNull(message = "receiverId is required")
    private Long receiverId; 
    @NotBlank(message = "senderName is required")
    private String senderName; 
    private String senderCode; 
    @NotBlank(message = "content is required")
    private String content;
}
