package com.sajjan.student_enrollment.service;

import com.sajjan.student_enrollment.exception.EnrollmentAlreadyExistsException;
import com.sajjan.student_enrollment.entity.Course;
import com.sajjan.student_enrollment.entity.Enrollment;
import com.sajjan.student_enrollment.entity.Student;
import com.sajjan.student_enrollment.repository.CourseRepository;
import com.sajjan.student_enrollment.repository.EnrollmentRepository;
import com.sajjan.student_enrollment.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    public Enrollment enrollStudent(Long studentId, Long courseId, String enrollmentDate) {

        Student student = studentRepository.findById(studentId).orElse(null);
        Course course = courseRepository.findById(courseId).orElse(null);
        if (enrollmentRepository.findEnrollment(studentId, courseId).isPresent()) {
            throw new EnrollmentAlreadyExistsException(
                    "Student is already enrolled in this course.");
        }

        if (student == null || course == null) {
            return null;
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(student);
        enrollment.setCourse(course);
        enrollment.setEnrollmentDate(enrollmentDate);

        return enrollmentRepository.save(enrollment);
    }
    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }
    public List<Enrollment> getEnrollmentsByStudentId(Long studentId) {
        return enrollmentRepository.findByStudentId(studentId);
    }
    public void removeEnrollment(Long id) {
        enrollmentRepository.deleteById(id);
    }
    // Get Total Enrollment Count
    public long getEnrollmentCount() {
        return enrollmentRepository.count();
    }

}
