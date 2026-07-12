package com.tiepsucomuathi.backend.controller;

import com.tiepsucomuathi.backend.entity.GalleryPhoto;
import com.tiepsucomuathi.backend.service.GalleryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/gallery")
@RequiredArgsConstructor
public class GalleryController {
    private final GalleryService galleryService;
    @GetMapping
    public ResponseEntity<List<GalleryPhoto>> getAll(
            @RequestParam(required = false) String category) {
        return ResponseEntity.ok(galleryService.getAll(category));
    }
    @PostMapping
    @org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GalleryPhoto> save(@RequestBody GalleryPhoto photo) {
        return ResponseEntity.ok(galleryService.save(photo));
    }

    @PutMapping("/{id}")
    @org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GalleryPhoto> update(@PathVariable Long id, @RequestBody GalleryPhoto photo) {
        return ResponseEntity.ok(galleryService.update(id, photo));
    }

    @DeleteMapping("/{id}")
    @org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable Long id) {
        galleryService.delete(id);
        return ResponseEntity.ok(Map.of("success", true, "message", "Xóa hình ảnh thành công"));
    }
}