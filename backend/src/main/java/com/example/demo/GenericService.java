package com.example.demo;

import com.example.demo.model.Volunteer;


import java.util.List;

/**
 * Created by nydiarra on 06/05/17.
 */
public interface GenericService {
    Volunteer findByUsername(String username);

    List<Volunteer> findAllVolunteers();

}
