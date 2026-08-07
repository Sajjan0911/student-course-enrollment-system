# 🎓 Student Course Enrollment System

A Spring Boot REST API project for managing Students, Courses, and Enrollments.

## 🚀 Technologies Used

- Java 21
- Spring Boot
- Spring Data JPA
- Hibernate
- MySQL
- Maven
- Postman
- Git & GitHub

---

## 📌 Features

### Student Management
- Add Student
- Get All Students
- Get Student by ID
- Update Student
- Delete Student
- Search Students by Name
- Count Total Students

### Course Management
- Add Course
- Get All Courses
- Get Course by ID
- Update Course
- Delete Course

### Enrollment Management
- Enroll Student into Course
- View All Enrollments
- View Enrollments by Student
- Remove Enrollment
- Prevent Duplicate Enrollments

---

## 🛠 REST API Endpoints

### Student APIs

| Method | Endpoint |
|---------|----------|
| POST | /students |
| GET | /students |
| GET | /students/{id} |
| PUT | /students/{id} |
| DELETE | /students/{id} |
| GET | /students/search?name=Sajjan |
| GET | /students/count |

---

### Course APIs

| Method | Endpoint |
|---------|----------|
| POST | /courses |
| GET | /courses |
| GET | /courses/{id} |
| PUT | /courses/{id} |
| DELETE | /courses/{id} |

---

### Enrollment APIs

| Method | Endpoint |
|---------|----------|
| POST | /enrollments |
| GET | /enrollments |
| GET | /enrollments/student/{studentId} |
| DELETE | /enrollments/{id} |

---

## ⚠️ Exception Handling

- StudentNotFoundException
- CourseNotFoundException
- EnrollmentAlreadyExistsException
- GlobalExceptionHandler

---

## 🗄 Database

MySQL Database

Tables:

- students
- courses
- enrollments

---

## ▶️ How to Run

1. Clone the repository

```bash
git clone https://github.com/Sajjan0911/student-course-enrollment-system.git
```

2. Open the project in IntelliJ IDEA.

3. Configure MySQL in `application.properties`.

4. Run:

```
StudentEnrollmentApplication.java
```

5. Test APIs using Postman.

---

## 👨‍💻 Author

**Sajjan Singh**

GitHub:
https://github.com/Sajjan0911