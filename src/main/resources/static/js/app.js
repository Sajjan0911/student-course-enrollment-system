document.addEventListener("DOMContentLoaded", () => {
    loadDashboard();
});

async function loadDashboard() {

    try {

        // Fetch counts
        const studentResponse = await fetch("/students/count");
        const courseResponse = await fetch("/courses/count");
        const enrollmentResponse = await fetch("/enrollments/count");

        // Convert to numbers
        const studentCount = parseInt(await studentResponse.text());
        const courseCount = parseInt(await courseResponse.text());
        const enrollmentCount = parseInt(await enrollmentResponse.text());

        // Update dashboard cards
        document.getElementById("studentCount").innerText = studentCount;
        document.getElementById("courseCount").innerText = courseCount;
        document.getElementById("enrollmentCount").innerText = enrollmentCount;

        // Draw chart
        createChart(studentCount, courseCount, enrollmentCount);

    } catch (error) {

        console.error("Dashboard Error:", error);

        Swal.fire({
            icon: "error",
            title: "Dashboard Error",
            text: "Unable to load dashboard data."
        });

    }

}

function createChart(studentCount, courseCount, enrollmentCount) {

    const ctx = document.getElementById("dashboardChart");

    new Chart(ctx, {

        type: "bar",

        data: {

            labels: [
                "Students",
                "Courses",
                "Enrollments"
            ],

            datasets: [{

                label: "Total Records",

                data: [
                    studentCount,
                    courseCount,
                    enrollmentCount
                ],

                backgroundColor: [
                    "#0d6efd",
                    "#198754",
                    "#ffc107"
                ],

                borderColor: [
                    "#0b5ed7",
                    "#157347",
                    "#ffca2c"
                ],

                borderWidth: 2,
                borderRadius: 10

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                title: {

                    display: true,
                    text: "Student Course Enrollment Overview",

                    font: {
                        size: 20
                    }

                },

                legend: {
                    display: false
                }

            },

            scales: {

                y: {

                    beginAtZero: true,

                    ticks: {
                        stepSize: 1
                    }

                }

            }

        }

    });

}