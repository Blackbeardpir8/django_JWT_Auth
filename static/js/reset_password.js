// static/js/reset_password.js

document.getElementById('resetPasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const uid = urlParams.get('uid');
    const token = urlParams.get('token');

    if (!uid || !token) {
        alert("Invalid or expired link.");
        return;
    }

    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;

    const response = await fetch(`/api/user/reset-password/${uid}/${token}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, password2 })
    });

    const data = await response.json();

    if (response.ok) {
        alert(data.message);
        window.location.href = '/login/';
    } else {
        if (data.error && (data.error.password || data.error.password2)) {
            alert((data.error.password || data.error.password2)[0]);
        } else {
            alert("Failed to reset password. Try again or request a new link.");
        }
    }
});
