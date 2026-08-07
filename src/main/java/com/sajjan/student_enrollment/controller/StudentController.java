package com.sajjan.student_enrollment.controller;
import jakarta.validation.Valid;
import com.sajjan.student_enrollment.entity.Student;
import com.sajjan.student_enrollment.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping
    public Student addStudent(@Valid@RequestBody Student student) {
        return studentService.addStudent(student);
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }@GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return "Student deleted successfully!";
    }
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id,
                                 @Valid@RequestBody Student student) {
        return studentService.updateStudent(id, student);
    }
    @GetMapping("/search")
    public List<Student> searchStudents(@RequestParam String name) {
        return studentService.searchStudentsByName(name);
    }
    @GetMapping("/count")
    public long countStudents() {
        return studentService.countStudents();
    }
}