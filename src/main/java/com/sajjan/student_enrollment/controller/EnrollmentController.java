package com.sajjan.student_enrollment.controller;

import com.sajjan.student_enrollment.entity.Enrollment;
import com.sajjan.student_enrollment.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enrollments")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    @PostMapping
    public Enrollment enrollStudent(@RequestParam Long studentId,
                                    @RequestParam Long courseId,
                                    @RequestParam String enrollmentDate) {

        return enrollmentService.enrollStudent(studentId, courseId, enrollmentDate);
    }
    @GetMapping
    public List<Enrollment> getAllEnrollments() {
        return enrollmentService.getAllEnrollments();
    }
    @GetMapping("/student/{studentId}")
    public List<Enrollment> getEnrollmentsByStudent(@PathVariable Long studentId) {
        return enrollmentService.getEnrollmentsByStudentId(studentId);
    }

    @DeleteMapping("/{id}")
    public String removeEnrollment(@PathVariable Long id) {

        enrollmentService.removeEnrollment(id);

        return "Enrollment removed successfully!";
    }
    @GetMapping("/count")
    public long getEnrollmentCount() {
        return enrollmentService.getEnrollmentCount();
    }

}