package com.tiepsucomuathi.backend.service;

import com.tiepsucomuathi.backend.entity.GalleryPhoto;
import com.tiepsucomuathi.backend.repository.GalleryPhotoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GalleryService {

    private final GalleryPhotoRepository galleryRepo;

    public List<GalleryPhoto> getAll(String category) {
        if (category != null && !category.isBlank()) {
            return galleryRepo.findByCategoryOrderByDisplayOrderAsc(category);
        }
        return galleryRepo.findAllByOrderByDisplayOrderAsc();
    }

    public GalleryPhoto save(GalleryPhoto photo) {
        return galleryRepo.save(photo);
    }

    public GalleryPhoto update(Long id, GalleryPhoto updated) {
        GalleryPhoto existing = galleryRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hình ảnh có ID: " + id));
        existing.setImageUrl(updated.getImageUrl());
        existing.setCategory(updated.getCategory());
        existing.setTitle(updated.getTitle());
        existing.setDetail(updated.getDetail());
        if (updated.getDisplayOrder() != null) {
            existing.setDisplayOrder(updated.getDisplayOrder());
        }
        return galleryRepo.save(existing);
    }

    public void delete(Long id) {
        if (!galleryRepo.existsById(id)) {
            throw new RuntimeException("Không tìm thấy hình ảnh có ID: " + id);
        }
        galleryRepo.deleteById(id);
    }
}