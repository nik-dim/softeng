package com.example.demo.controller;

import com.example.demo.model.Tag;
import com.example.demo.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TagController {

    @Autowired
    TagRepository TagRepository;

    @GetMapping("/tags")
    public List<Tag> index() {
        return TagRepository.findAll();
    }
}
