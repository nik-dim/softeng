package com.example.demo.repository;

import com.example.demo.model.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VolunteerRepository extends JpaRepository<Volunteer, Integer> {
//    List<Volunteer> findByTitleContainingOrContentContaining(String text, String textAgain);
}
