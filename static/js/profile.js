// static/js/profile.js

// Get the access token from local storage
const accessToken = localStorage.getItem('accessToken');

// Redirect to login if not authenticated
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
            alert("Session expired or unauthorized. Please log in again.");
            localStorage.removeItem('accessToken');
            window.location.href = '/login/';
        }
    } catch (error) {
        console.error("Error fetching profile:", error);
        alert("Something went wrong. Try again later.");
    }
}

// Logout function
function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login/';
}

// Load profile on page load
fetchProfile();
