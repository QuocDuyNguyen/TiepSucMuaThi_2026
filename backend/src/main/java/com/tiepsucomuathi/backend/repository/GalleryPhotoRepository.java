package com.tiepsucomuathi.backend.repository;

import com.tiepsucomuathi.backend.entity.GalleryPhoto;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface GalleryPhotoRepository extends JpaRepository<GalleryPhoto, Long> {
    List<GalleryPhoto> findAllByOrderByDisplayOrderAsc();
    List<GalleryPhoto> findByCategoryOrderByDisplayOrderAsc(String category);
}
