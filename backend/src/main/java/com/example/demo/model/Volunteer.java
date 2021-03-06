package com.example.demo.model;

import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import javax.persistence.*;

@Entity
@Table(name = "volunteer")
public class Volunteer {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String firstname;
    private String lastname;
    private String phone;
    private String email;
    private Date dateofbirth;
    private String role;

    private String pass;

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public Volunteer(String username, String pass) {
        this.username = username;
        this.pass = pass;
        this.firstname = "kapa";
        this.lastname = "poppop";
        this.phone = "0989098";
        this.email = "kapaaaaaaaaaa";
        this.dateofbirth =  Date.valueOf("2000-12-18");
        this.role = "USER";
    }

    public Volunteer(String username, String pass, String email) {
        this.username = username;
        this.pass = pass;
        this.firstname = "kapa";
        this.lastname = "poppop";
        this.phone = "0989098";
        this.email = email;
        this.dateofbirth =  Date.valueOf("2000-12-18");
        this.role = "USER";
    }



    public Volunteer(String username, String firstname, String lastname, String phone, String email, Date dateofbirth, String role, String pass) {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phone = phone;
        this.email = email;
        this.dateofbirth = dateofbirth;
        this.role = role;
        this.pass = pass;
    }

    //    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp dateofreg;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getDateofbirth() {
        return dateofbirth;
    }

    public void setDateofbirth(Date dateofbirth) {
        this.dateofbirth = dateofbirth;
    }

    public Timestamp getDateofreg() {
        return dateofreg;
    }

    public void setDateofreg(Timestamp dateofreg) {
        this.dateofreg = dateofreg;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Volunteer() {}

    public Volunteer(String username, String firstname, String lastname, String phone, String email, Date dateOfBirth, Timestamp dateOfRegistration) {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phone = phone;
        this.email = email;
        this.dateofbirth = dateOfBirth;
        this.dateofreg = dateOfRegistration;
    }
    public Volunteer(String username, String firstname, String lastname, String phone, String email, Date dateOfBirth) {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phone = phone;
        this.email = email;
        this.dateofbirth = dateOfBirth;
    }




    @Override
    public String toString() {
        return "Volunteer{" +
                "Id=" + id +
                ", username='" + username + '\'' +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                ", dateOfBirth=" + dateofbirth +
                ", dateOfRegistration=" + dateofreg +
                '}';
    }

}