package com.tiepsucomuathi.backend.repository;
import com.tiepsucomuathi.backend.entity.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
public interface VolunteerRepository extends JpaRepository<Volunteer, Long>{
    
    Optional<Volunteer> findBySlug(String slug);
   
    List<Volunteer> findByFeaturedTrueOrderByDisplayOrderAsc();
    


}

