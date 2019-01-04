package com.example.demo.controller;

import com.example.demo.model.Password;
import com.example.demo.model.Volunteer;
import com.example.demo.repository.PasswordRepository;
import com.example.demo.repository.VolunteerRepository;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import static com.example.demo.repository.PasswordRepository.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class VolunteerController {


    @Autowired
    VolunteerRepository VolunteerRepository;

    @Autowired
    PasswordRepository passwordRepository;

    private BCryptPasswordEncoder bCryptPasswordEncoder;


    public VolunteerController(VolunteerRepository applicationUserRepository,
                               BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.VolunteerRepository = applicationUserRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }


    @GetMapping("/volunteers")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<Volunteer> index(){
        return VolunteerRepository.findAll();
    }

    @GetMapping("/me")
    //@PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Object me(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth.getDetails();
    }



    @PostMapping("/volunteers")
    @ResponseBody
//    @PreAuthorize("hasRole('ADMIN') or hasAuthority('USER')")
    public Volunteer create(@RequestBody String body) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(body);
        String pp = root.path("p").toString();

        Volunteer vol = mapper.readerFor(Volunteer.class).readValue(root.path("v"));
        System.out.println(pp);
        Password p = new Password(pp);
        Volunteer vol1 = VolunteerRepository.save(vol);
        p.setVolunteer(vol1);
        passwordRepository.save(p);

        return vol1;
    }



    @PostMapping("/sign-up")
    @ResponseBody
//    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public Volunteer signUp(@RequestBody Volunteer vol) throws IOException {
        Volunteer vol1 = new Volunteer(vol.getUsername(), vol.getPass());
        vol1.setPass(bCryptPasswordEncoder.encode(vol1.getPass()));
        return VolunteerRepository.save(vol1);
    }


}