document.addEventListener('DOMContentLoaded', () => {
    const themeButton = document.getElementById("themeButton");
    const body = document.body;
    const generateButton = document.getElementById('generateButton');
    const promptInput = document.getElementById('promptInput');
    const activityList = document.getElementById('activityList');
    const sidebar = document.getElementById('sidebar');
    const activitiesButton = document.getElementById('activitiesButton');

    function toggleDarkMode() {
        body.classList.toggle("dark-mode");
        const icon = themeButton.querySelector("i");
        if (body.classList.contains("dark-mode")) {
            icon.classList.replace("fa-sun", "fa-moon");
            localStorage.setItem("theme", "dark");
        } else {
            icon.classList.replace("fa-moon", "fa-sun");
            localStorage.setItem("theme", "light");
        }
    }

    function applyDarkMode() {
        if (localStorage.getItem("theme") === "dark") {
            body.classList.add("dark-mode");
            const icon = themeButton.querySelector("i");
            icon.classList.replace("fa-sun", "fa-moon");
        }
    }

    applyDarkMode();

    if (themeButton) {
        themeButton.addEventListener("click", toggleDarkMode);
    } else {
        console.error("themeButton not found!");
    }

    activitiesButton.addEventListener('click', () => {
        sidebar.style.width = sidebar.style.width === '250px' ? '0' : '250px';
    });

    generateButton.addEventListener('click', () => {
        const prompt = promptInput.value;

        fetch('/generate', { // Use the Flask route
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: prompt }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.generated_text) {
                const li = document.createElement('li');
                li.textContent = prompt + " : " + data.generated_text;
                activityList.appendChild(li);
                promptInput.value = ""; // Clear the input
            } else {
                console.error('Error:', data.error);
                alert("An error occurred: " + data.error)
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            alert("Network error occurred.")
        });
    });
});
