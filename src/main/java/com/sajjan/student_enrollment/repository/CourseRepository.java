package com.sajjan.student_enrollment.repository;

import com.sajjan.student_enrollment.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {

}