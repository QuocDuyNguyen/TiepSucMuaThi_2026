package com.tiepsucomuathi.backend.dto.request;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class GratitudeRequest {
    @NotNull(message = "volunteerId is required")
    private Long volunteerId;

    @NotBlank(message = "senderName is required")
    private String senderName;


    @NotBlank(message = "content is required")
    private String content;
}
