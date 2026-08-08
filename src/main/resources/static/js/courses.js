const API_URL = "/courses";

document.addEventListener("DOMContentLoaded", () => {

    loadCourses();

    document.getElementById("saveCourse")
        .addEventListener("click", saveCourse);

    document.getElementById("searchInput")
        .addEventListener("keyup", searchCourse);

});

// =======================
// Load All Courses
// =======================

async function loadCourses() {

    const response = await fetch(API_URL);

    const courses = await response.json();

    let rows = "";

    courses.forEach(course => {

        rows += `
        <tr>

            <td>${course.id}</td>

            <td>${course.courseName}</td>

            <td>${course.duration}</td>

            <td>${course.instructor}</td>

            <td>

                <button
                    class="btn btn-warning btn-sm"
                    onclick="editCourse(${course.id})">

                    <i class="bi bi-pencil"></i>

                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteCourse(${course.id})">

                    <i class="bi bi-trash"></i>

                </button>

            </td>

        </tr>
        `;

    });

    document.getElementById("courseTable").innerHTML = rows;

}

// =======================
// Save Course
// =======================

async function saveCourse() {

    const id = document.getElementById("courseId").value;

    const course = {

        courseName: document.getElementById("courseName").value,
        duration: document.getElementById("duration").value,
        instructor: document.getElementById("instructor").value

    };

    let url = API_URL;
    let method = "POST";

    if (id) {

        url = `${API_URL}/${id}`;
        method = "PUT";

    }

    const response = await fetch(url, {

        method: method,

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(course)

    });

    if (response.ok) {

        alert(id ? "Course Updated Successfully!" : "Course Added Successfully!");

        document.getElementById("courseId").value = "";
        document.getElementById("courseName").value = "";
        document.getElementById("duration").value = "";
        document.getElementById("instructor").value = "";

        document.getElementById("modalTitle").innerText = "Add Course";

        bootstrap.Modal.getInstance(
            document.getElementById("courseModal")
        ).hide();

        loadCourses();

    } else {

        alert(await response.text());

    }

}

// =======================
// Edit Course
// =======================

async function editCourse(id) {

    const response = await fetch(`${API_URL}/${id}`);

    const course = await response.json();

    document.getElementById("courseId").value = course.id;
    document.getElementById("courseName").value = course.courseName;
    document.getElementById("duration").value = course.duration;
    document.getElementById("instructor").value = course.instructor;

    document.getElementById("modalTitle").innerText = "Update Course";

    const modal = new bootstrap.Modal(
        document.getElementById("courseModal")
    );

    modal.show();

}

// =======================
// Delete Course
// =======================

async function deleteCourse(id) {

    if (!confirm("Delete this course?")) {

        return;

    }

    await fetch(`${API_URL}/${id}`, {

        method: "DELETE"

    });

    loadCourses();

}

// =======================
// Search Course
// =======================

async function searchCourse() {

    const keyword = document.getElementById("searchInput").value.toLowerCase();

    const response = await fetch(API_URL);

    const courses = await response.json();

    const filtered = courses.filter(course =>
        course.courseName.toLowerCase().includes(keyword)
    );

    let rows = "";

    filtered.forEach(course => {

        rows += `
        <tr>

            <td>${course.id}</td>

            <td>${course.courseName}</td>

            <td>${course.duration}</td>

            <td>${course.instructor}</td>

            <td>

                <button
                    class="btn btn-warning btn-sm"
                    onclick="editCourse(${course.id})">

                    <i class="bi bi-pencil"></i>

                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteCourse(${course.id})">

                    <i class="bi bi-trash"></i>

                </button>

            </td>

        </tr>
        `;

    });

    document.getElementById("courseTable").innerHTML = rows;

}