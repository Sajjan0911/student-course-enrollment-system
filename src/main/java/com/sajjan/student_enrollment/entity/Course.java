package com.sajjan.student_enrollment.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Course name cannot be empty")
    private String courseName;

    @NotBlank(message = "Duration cannot be empty")
    private String duration;

    @NotBlank(message = "Instructor cannot be empty")
    private String instructor;

    public Course() {
    }

    public Course(Long id, String courseName, String duration, String instructor) {
        this.id = id;
        this.courseName = courseName;
        this.duration = duration;
        this.instructor = instructor;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }
    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getInstructor() {
        return instructor;
    }

    public void setInstructor(String instructor) {
        this.instructor = instructor;
    }
}