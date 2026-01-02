// Dark mode toggle
const toggleBtn = document.getElementById("themeToggle");

toggleBtn?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Mobile menu
const menuBtn = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

menuBtn?.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});
