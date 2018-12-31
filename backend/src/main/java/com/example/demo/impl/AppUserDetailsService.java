package com.example.demo.impl;

import com.example.demo.model.Password;
import com.example.demo.model.Volunteer;
import com.example.demo.repository.PasswordRepository;
import com.example.demo.repository.VolunteerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by nydiarra on 06/05/17.
 */
@Component
public class AppUserDetailsService implements UserDetailsService {
    @Autowired
    private VolunteerRepository volunteerRepository;

    @Autowired
    private PasswordRepository passwordRepository;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Volunteer volunteer = volunteerRepository.findByUsername(s);

        Password password = passwordRepository.findByVolunteer_id(volunteer.getId());
        if(volunteer == null) {
            throw new UsernameNotFoundException(String.format("The username %s doesn't exist", s));
        }

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(volunteer.getRole()));


        UserDetails userDetails = new org.springframework.security.core.userdetails.
                User(volunteer.getUsername(), password.getValue(), authorities);

        return userDetails;
    }
}
