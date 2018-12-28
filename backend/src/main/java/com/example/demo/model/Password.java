package com.example.demo.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "password")
//@IdClass(Volunteer.class)
public class Password implements Serializable {

    @Id
    @JoinColumn(name = "volunteer_id", nullable = false)
    private long volunteer_id;

    @OneToOne
    @PrimaryKeyJoinColumn(name = "volunteer_id")
    private Volunteer volunteer;

    private String value;


    public Volunteer getVolunteer() {
        return volunteer;
    }

    public void setVolunteer(Volunteer volunteer) {
        this.volunteer = volunteer;
        this.volunteer_id = volunteer.getId();
    }

    public long getVolunteer_id() {
        return volunteer_id;
    }

    public void setVolunteer_id(int volunteer_id) {
        this.volunteer_id = volunteer_id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

//    public Password(long volunteer_id, String value) {
//        this.volunteer_id = volunteer_id;
//        this.value = value;
//    }

    public Password() { }

    public Password(Volunteer volunteer, String value) {
        this.volunteer = volunteer;
        this.volunteer_id = volunteer.getId();
        this.value = value;
    }

    public Password(String value) {
        this.value = value;
    }
}
