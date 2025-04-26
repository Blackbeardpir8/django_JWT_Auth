// static/js/register.js
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;

    const response = await fetch('/api/user/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, password2 })
    });

    const data = await response.json();
    alert(data.message || JSON.stringify(data.error));
    if (data.status) {
        window.location.href = '/login/';
    }
});
