document.addEventListener("DOMContentLoaded", () => {
    const themeButton = document.getElementById("themeButton");
    const body = document.body;

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
});