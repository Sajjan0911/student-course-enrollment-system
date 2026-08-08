const API_URL = "/students";

document.addEventListener("DOMContentLoaded", () => {

    loadStudents();

    document.getElementById("saveStudent")
        .addEventListener("click", saveStudent);

    document.getElementById("searchInput")
        .addEventListener("keyup", searchStudent);

});


// =========================
// Load All Students
// =========================

async function loadStudents() {

    const response = await fetch(API_URL);

    const students = await response.json();

    let rows = "";

    students.forEach(student => {

        rows += `
            <tr>

                <td>${student.id}</td>

                <td>${student.name}</td>

                <td>${student.email}</td>

                <td>${student.phone}</td>

                <td>

                    <button
                        class="btn btn-warning btn-sm"
                        onclick="editStudent(${student.id})">

                        <i class="bi bi-pencil"></i>

                    </button>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="deleteStudent(${student.id})">

                        <i class="bi bi-trash"></i>

                    </button>

                </td>

            </tr>
        `;

    });

    document.getElementById("studentTable").innerHTML = rows;

}


// =========================
// Save Student
// =========================
async function saveStudent() {

    const id = document.getElementById("studentId").value;

    console.log("Student ID:", id);

    const student = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value
    };

    let url = API_URL;
    let method = "POST";

    if (id && id.trim() !== "") {
        url = `${API_URL}/${id}`;
        method = "PUT";
    }

    console.log("URL:", url);
    console.log("Method:", method);
    console.log("Student Data:", student);

    try {

        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });

        if (response.ok) {

            Swal.fire({
                icon: "success",
                title: method === "POST" ? "Student Added!" : "Student Updated!",
                text: method === "POST"
                    ? "Student has been added successfully."
                    : "Student has been updated successfully.",
                timer: 1800,
                showConfirmButton: false
            });

            // Clear form
            document.getElementById("studentId").value = "";
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone").value = "";

            document.getElementById("modalTitle").innerText = "Add Student";

            // Close modal
            const modalElement = document.getElementById("studentModal");
            const modal = bootstrap.Modal.getInstance(modalElement);

            if (modal) {
                modal.hide();
            }

            loadStudents();

        } else {

            const error = await response.text();

            console.error("Server Error:", error);

            Swal.fire({
                icon: "error",
                title: "Server Error",
                text: error
            });
        }

    } catch (e) {

        console.error("JavaScript Error:", e);

        Swal.fire({
            icon: "error",
            title: "JavaScript Error",
            text: e.message
        });
    }
}

// =========================
// Search Student
// =========================

async function searchStudent() {

    const name = document.getElementById("searchInput").value;

    if (name === "") {

        loadStudents();

        return;

    }

    const response =
        await fetch(`/students/search?name=${name}`);

    const students = await response.json();

    let rows = "";

    students.forEach(student => {

        rows += `
            <tr>

                <td>${student.id}</td>

                <td>${student.name}</td>

                <td>${student.email}</td>

                <td>${student.phone}</td>

                <td>

                    <button
    class="btn btn-warning btn-sm"
    onclick="editStudent(${student.id})">

    <i class="bi bi-pencil"></i>

</button>

<button
    class="btn btn-danger btn-sm"
    onclick="deleteStudent(${student.id})">

    <i class="bi bi-trash"></i>

</button>

                </td>

            </tr>
        `;

    });

    document.getElementById("studentTable").innerHTML = rows;

}


// =========================
// Delete Student
// =========================

async function deleteStudent(id) {

    const result = await Swal.fire({
        title: "Delete Student?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, Delete"
    });

    if (!result.isConfirmed) {
        return;
    }

    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (response.ok) {

        Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Student deleted successfully.",
            timer: 1500,
            showConfirmButton: false
        });

        loadStudents();

    } else {

        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Unable to delete student."
        });

    }

}

// =========================
// Edit Student
// =========================

async function editStudent(id) {

    const response = await fetch(`${API_URL}/${id}`);

    const student = await response.json();

    document.getElementById("studentId").value = student.id;
    document.getElementById("name").value = student.name;
    document.getElementById("email").value = student.email;
    document.getElementById("phone").value = student.phone;

    document.getElementById("modalTitle").innerText = "Update Student";

    const modal = new bootstrap.Modal(
        document.getElementById("studentModal")
    );

    modal.show();

}