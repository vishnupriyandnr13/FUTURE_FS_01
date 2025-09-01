// =========================
// Theme Toggle Script
// =========================
const themeToggle = document.getElementById("themeToggle");
const rootElement = document.documentElement;

// Load saved theme from localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  rootElement.setAttribute("data-theme", savedTheme);
  updateThemeButtonIcon(savedTheme);
} else {
  rootElement.setAttribute("data-theme", "light");
}

// Toggle theme on button click
themeToggle.addEventListener("click", () => {
  const currentTheme = rootElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  rootElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeButtonIcon(newTheme);
});

// Update button emoji/icon
function updateThemeButtonIcon(theme) {
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

// =========================
// Contact Form Submission
// =========================
document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  // Collect form data
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("⚠️ Please fill in all fields.");
    return;
  }

  try {
    // Send data to backend
    const response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("✅ Thank you for reaching out, " + name + "! Your message has been sent.");
      this.reset();
    } else {
      alert("❌ Error: " + (result.msg || "Unable to send message."));
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("❌ Failed to connect to backend. Please try again later.");
  }
});
