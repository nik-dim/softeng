package com.example.demo.controller;

import com.example.demo.model.Volunteer;
import com.example.demo.repository.VolunteerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class VolunteerController {


    @Autowired
    VolunteerRepository VolunteerRepository;

    @GetMapping("/volunteers")
    public List<Volunteer> index(){
        return VolunteerRepository.findAll();
    }
}