function validateForm() {
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm-password").value;
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }
    return true;
}

function checkPasswords() {
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm-password").value;
    var submitButton = document.getElementById("submit-btn");

    if (password === confirmPassword) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}


