package com.example.demo.impl;


import com.example.demo.GenericService;
import com.example.demo.model.Volunteer;
import com.example.demo.repository.VolunteerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by nydiarra on 07/05/17.
 */
@Service
public class GenericServiceImpl implements GenericService {
    @Autowired
    private VolunteerRepository volunteerRepository;


    @Override
    public Volunteer findByUsername(String username) {
        return volunteerRepository.findByUsername(username);
    }

    @Override
    public List<Volunteer> findAllVolunteers() {
        return (List<Volunteer>) volunteerRepository.findAll();
    }


}
