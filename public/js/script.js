// Example of client-side JavaScript code

// Function to validate login form
function validateLoginForm() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Please enter both username and password.');
        return false;
    }

    return true;
}

// Function to validate registration form
function validateRegistrationForm() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Please enter both username and password.');
        return false;
    }

    return true;
}

// Example of adding event listeners to form submissions
document.getElementById('loginForm').addEventListener('submit', function(event) {
    if (!validateLoginForm()) {
        event.preventDefault(); // Prevent form submission if validation fails
    }
});

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    if (!validateRegistrationForm()) {
        event.preventDefault(); // Prevent form submission if validation fails
    }
});
