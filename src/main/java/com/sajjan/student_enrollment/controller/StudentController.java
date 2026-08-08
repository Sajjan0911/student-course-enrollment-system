package com.sajjan.student_enrollment.controller;

import com.sajjan.student_enrollment.entity.Student;
import com.sajjan.student_enrollment.pdf.StudentPdfGenerator;
import com.sajjan.student_enrollment.service.StudentService;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping
    public Student addStudent(@Valid @RequestBody Student student) {
        return studentService.addStudent(student);
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
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
                                 @Valid @RequestBody Student student) {
        return studentService.updateStudent(id, student);
    }

    @GetMapping("/search")
    public List<Student> searchStudents(@RequestParam String name) {
        return studentService.searchStudentsByName(name);
    }

    @GetMapping("/count")
    public long getStudentCount() {
        return studentService.getStudentCount();
    }

    @GetMapping("/pdf")
    public void exportStudentPdf(HttpServletResponse response) throws IOException {

        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition",
                "attachment; filename=students.pdf");

        StudentPdfGenerator.export(
                studentService.getAllStudents(),
                response
        );
    }
}