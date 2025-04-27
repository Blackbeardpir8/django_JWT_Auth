// Check if user is authenticated
function isAuthenticated() {
  return localStorage.getItem("accessToken") !== null;
}

// Update navigation based on authentication status
function updateNavigation() {
  const authOnlyElements = document.querySelectorAll(".auth-only");
  const guestOnlyElements = document.querySelectorAll(".guest-only");

  if (isAuthenticated()) {
    authOnlyElements.forEach((el) => (el.style.display = "inline-block"));
    guestOnlyElements.forEach((el) => (el.style.display = "none"));
  } else {
    authOnlyElements.forEach((el) => (el.style.display = "none"));
    guestOnlyElements.forEach((el) => (el.style.display = "inline-block"));
  }
}

// Handle logout
function setupLogout() {
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user_data");
      window.location.href = "/login/";
    });
  }
}

// Show message in alert box
function showMessage(elementId, message, type) {
  const messageBox = document.getElementById(elementId);
  if (!messageBox) {
    return;
  }

  messageBox.textContent = message;
  messageBox.className = "alert-box";
  messageBox.classList.add(`alert-${type}`);
  messageBox.style.display = "block";

  if (type === "success") {
    setTimeout(() => {
      messageBox.style.display = "none";
    }, 5000);
  }
}

// Format date
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Check password strength
function checkPasswordStrength(password) {
  let score = 0;

  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  return score;
}

// Update password strength meter
function updatePasswordStrength(passwordInput, meterElement, textElement) {
  if (!passwordInput || !meterElement || !textElement) return;

  const password = passwordInput.value;
  const score = checkPasswordStrength(password);

  let width, color, text;

  switch (score) {
    case 0:
      width = "0%"; color = "#ef4444"; text = "Too weak"; break;
    case 1:
      width = "25%"; color = "#ef4444"; text = "Weak"; break;
    case 2:
      width = "50%"; color = "#f59e0b"; text = "Fair"; break;
    case 3:
      width = "75%"; color = "#10b981"; text = "Good"; break;
    case 4:
    case 5:
      width = "100%"; color = "#10b981"; text = "Strong"; break;
  }

  meterElement.style.width = width;
  meterElement.style.backgroundColor = color;
  textElement.textContent = `Password strength: ${text}`;
  textElement.style.color = color;
}

// Initialize password strength meters
function initPasswordStrengthMeters() {
  const passwordInputs = document.querySelectorAll('input[type="password"]');

  passwordInputs.forEach((input) => {
    const group = input.closest(".form-group");
    if (!group) return;

    const strengthMeter = group.querySelector(".strength-meter");
    const strengthText = group.querySelector(".strength-text");

    if (strengthMeter && strengthText) {
      input.addEventListener("input", () => {
        updatePasswordStrength(input, strengthMeter, strengthText);
      });
    }
  });
}

// Document ready
document.addEventListener("DOMContentLoaded", () => {
  updateNavigation();
  setupLogout();
  initPasswordStrengthMeters();
});
