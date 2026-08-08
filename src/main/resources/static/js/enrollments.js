const ENROLLMENT_API = "/enrollments";
const STUDENT_API = "/students";
const COURSE_API = "/courses";

document.addEventListener("DOMContentLoaded", () => {

    loadStudents();
    loadCourses();
    loadEnrollments();

    // Set today's date by default
    document.getElementById("enrollmentDate").value =
        new Date().toISOString().split("T")[0];

    document.getElementById("enrollBtn")
        .addEventListener("click", enrollStudent);

});

// =======================
// Load Students
// =======================

async function loadStudents() {

    const response = await fetch(STUDENT_API);

    const students = await response.json();

    let options = "";

    students.forEach(student => {

        options += `
            <option value="${student.id}">
                ${student.name}
            </option>
        `;

    });

    document.getElementById("studentSelect").innerHTML = options;

}

// =======================
// Load Courses
// =======================

async function loadCourses() {

    const response = await fetch(COURSE_API);

    const courses = await response.json();

    let options = "";

    courses.forEach(course => {

        options += `
            <option value="${course.id}">
                ${course.courseName}
            </option>
        `;

    });

    document.getElementById("courseSelect").innerHTML = options;

}

// =======================
// Load Enrollments
// =======================

async function loadEnrollments() {

    const response = await fetch(ENROLLMENT_API);

    const enrollments = await response.json();

    let rows = "";

    enrollments.forEach(enrollment => {

        rows += `
            <tr>

                <td>${enrollment.id}</td>

                <td>${enrollment.student.name}</td>

                <td>${enrollment.course.courseName}</td>

                <td>${enrollment.enrollmentDate}</td>

                <td>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="deleteEnrollment(${enrollment.id})">

                        <i class="bi bi-trash"></i>

                    </button>

                </td>

            </tr>
        `;

    });

    document.getElementById("enrollmentTable").innerHTML = rows;

}

// =======================
// Enroll Student
// =======================

async function enrollStudent() {

    const studentId =
        document.getElementById("studentSelect").value;

    const courseId =
        document.getElementById("courseSelect").value;

    const enrollmentDate =
        document.getElementById("enrollmentDate").value;

    const response = await fetch(

        `${ENROLLMENT_API}?studentId=${studentId}&courseId=${courseId}&enrollmentDate=${enrollmentDate}`,

        {
            method: "POST"
        }

    );

    if (response.ok) {

        alert("Student Enrolled Successfully!");

        loadEnrollments();

    } else {

        alert(await response.text());

    }

}

// =======================
// Delete Enrollment
// =======================

async function deleteEnrollment(id) {

    if (!confirm("Delete this enrollment?")) {

        return;

    }

    await fetch(`${ENROLLMENT_API}/${id}`, {

        method: "DELETE"

    });

    loadEnrollments();

}