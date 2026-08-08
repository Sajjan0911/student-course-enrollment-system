package com.sajjan.student_enrollment.service;

import com.sajjan.student_enrollment.entity.Course;
import com.sajjan.student_enrollment.repository.CourseRepository;
import com.sajjan.student_enrollment.exception.CourseNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    // Add Course
    public Course addCourse(Course course) {
        return courseRepository.save(course);
    }

    // Get All Courses
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // Get Course By ID
    public Course getCourseById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new CourseNotFoundException("Course not found with id: " + id));
    }

    // Update Course
    public Course updateCourse(Long id, Course course) {

        Course existingCourse = courseRepository.findById(id)
                .orElseThrow(() -> new CourseNotFoundException("Course not found with id: " + id));

        existingCourse.setCourseName(course.getCourseName());
        existingCourse.setDuration(course.getDuration());
        existingCourse.setInstructor(course.getInstructor());

        return courseRepository.save(existingCourse);
    }

    // Delete Course
    public void deleteCourse(Long id) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new CourseNotFoundException("Course not found with id: " + id));

        courseRepository.delete(course);
    }
    // Get Total Course Count
    public long getCourseCount() {
        return courseRepository.count();
    }
}