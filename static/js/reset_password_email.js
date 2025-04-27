// static/js/reset_password_email.js

document.getElementById('forgotPasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;

    const response = await fetch('/api/user/reset-password-email/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (response.ok) {
        alert(data.message);
        window.location.href = '/login/';
    } else {
        alert("Email not found or error occurred. Try again.");
    }
});
