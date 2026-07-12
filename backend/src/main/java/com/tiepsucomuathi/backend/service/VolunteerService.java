package com.tiepsucomuathi.backend.service;

import com.tiepsucomuathi.backend.entity.Volunteer;
import com.tiepsucomuathi.backend.repository.VolunteerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
@RequiredArgsConstructor
public class VolunteerService {
    private final VolunteerRepository volunteerRepo;
    public List<Volunteer> getAll(){
        return volunteerRepo.findAll();
    }
    public Volunteer getBySlug(String slug){
        return volunteerRepo.findBySlug(slug).orElseThrow(() -> new RuntimeException("Không tìm thấy thành viên: " + slug));
    }
    public Volunteer update(Long id, Volunteer updatedData) {
        Volunteer existing = volunteerRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thành viên có ID: " + id));
        existing.setFullName(updatedData.getFullName());
        existing.setRoleName(updatedData.getRoleName());
        existing.setAvatarUrl(updatedData.getAvatarUrl());
        existing.setCoverUrl(updatedData.getCoverUrl());
        existing.setQuote(updatedData.getQuote());
        existing.setBio(updatedData.getBio());
        existing.setFeatured(updatedData.getFeatured());
        if (updatedData.getBirthYear() != null) {
            existing.setBirthYear(updatedData.getBirthYear());
        }
        if (updatedData.getDisplayOrder() != null) {
            existing.setDisplayOrder(updatedData.getDisplayOrder());
        }
        return volunteerRepo.save(existing);
    }
}
