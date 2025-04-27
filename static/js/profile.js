// static/js/profile.js

// Get token
const accessToken = localStorage.getItem('accessToken');

// If no token, redirect
if (!accessToken) {
    alert("You must be logged in to view your profile.");
    window.location.href = '/login/';
}

// Fetch profile data
async function fetchProfile() {
    try {
        const response = await fetch('/api/user/profile/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('name').textContent = data.user.name;
            document.getElementById('email').textContent = data.user.email;
            document.getElementById('is_staff').textContent = data.user.is_staff ? 'Yes' : 'No';
        } else {
            autoLogout();  // Auto logout if token expired or invalid
        }
    } catch (error) {
        console.error("Error fetching profile:", error);
        autoLogout();  // Auto logout on error
    }
}

// Manual Logout Button
document.getElementById('logoutButton').addEventListener('click', logout);

// Logout Function
function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login/';
}

// Auto Logout Function (when token expires or is invalid)
function autoLogout() {
    alert("Session expired. Please login again.");
    logout();
}

// Call on page load
fetchProfile();
