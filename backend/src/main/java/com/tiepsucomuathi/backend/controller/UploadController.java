package com.tiepsucomuathi.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
public class UploadController {
    
    private final String UPLOAD_DIR = "uploads/";

    public UploadController() {
        File directory = new File(UPLOAD_DIR);
        if (!directory.exists()) {
            directory.mkdirs();
        }
    }

    @PostMapping
    @org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "File is empty"));
        }
        try {
            String originalFilename = file.getOriginalFilename();
            if(originalFilename == null) originalFilename = "image.jpg";
            // Clean filename
            originalFilename = originalFilename.replaceAll("[^a-zA-Z0-9\\.\\-]", "_");
            String filename = UUID.randomUUID().toString() + "_" + originalFilename;
            Path path = Paths.get(UPLOAD_DIR + filename);
            Files.write(path, file.getBytes());
            
            // Return URL 
            String url = "http://localhost:8080/uploads/" + filename;
            return ResponseEntity.ok(Map.of("url", url));
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "Failed to upload"));
        }
    }
}
