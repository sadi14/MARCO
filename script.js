document.addEventListener("DOMContentLoaded", () => {
    // Password visibility toggles
    setupPasswordToggle("signupPassword", "signupPasswordToggle");
    setupPasswordToggle("loginPassword", "loginPasswordToggle");
});

function setupPasswordToggle(passwordId, toggleId) {
    const passwordInput = document.getElementById(passwordId);
    const toggleIcon = document.getElementById(toggleId);

    toggleIcon.addEventListener("click", () => {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            toggleIcon.classList.replace("fa-eye", "fa-eye-slash");
        } else {
            passwordInput.type = "password";
            toggleIcon.classList.replace("fa-eye-slash", "fa-eye");
        }
    });
}

// Function to toggle between Signup and Login forms
function toggleForm(form) {
    document.getElementById("signupForm").classList.add("hidden");
    document.getElementById("loginForm").classList.add("hidden");
    document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));

    if (form === "signup") {
        document.getElementById("signupForm").classList.remove("hidden");
        document.querySelectorAll(".tab")[0].classList.add("active");
    } else {
        document.getElementById("loginForm").classList.remove("hidden");
        document.querySelectorAll(".tab")[1].classList.add("active");
    }
}

function validateEmail(emailId, errorId, isSignup) {
    const emailInput = document.getElementById(emailId);
    const passwordInput = isSignup ? document.getElementById("signupPassword") : document.getElementById("loginPassword");
    const errorMsg = document.getElementById(errorId);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const formType = isSignup ? "signup" : "login";

    if (!emailPattern.test(emailInput.value)) {
        errorMsg.textContent = "Invalid email format.";
        errorMsg.style.display = "block";
        return;
    } else {
        errorMsg.style.display = "none";
    }

    if (isSignup) {
        localStorage.setItem("userEmail", emailInput.value);
        localStorage.setItem("userPassword", passwordInput.value);
        alert(`Thank you for ${formType}!`);
        window.location.href = "writing.html";
    } else {
        const storedEmail = localStorage.getItem("userEmail");
        const storedPassword = localStorage.getItem("userPassword");

        if (emailInput.value === storedEmail) {
            if (passwordInput.value === storedPassword) {
                alert(`Thank you for ${formType}!`);
                window.location.href = "writing.html";
            } else {
                errorMsg.textContent = "Incorrect password.";
                errorMsg.style.display = "block";
            }
        } else {
            errorMsg.textContent = "Incorrect email.";
            errorMsg.style.display = "block";
        }
    }
}