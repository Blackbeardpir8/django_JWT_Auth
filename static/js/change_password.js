// static/js/change_password.js

document.getElementById('changePasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        alert("You must be logged in to change your password.");
        window.location.href = '/login/';
        return;
    }

    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;

    const response = await fetch('/api/user/change-password/', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, password2 })
    });

    const data = await response.json();

    if (response.ok) {
        alert(data.message);  // Password changed successfully
        window.location.href = '/profile/';
    } else {
        // Show error
        if (data.error && (data.error.password || data.error.password2)) {
            alert((data.error.password || data.error.password2)[0]);
        } else {
            alert("Failed to change password. Try again.");
        }
    }
});
