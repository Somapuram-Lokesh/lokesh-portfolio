document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
  if (document.body.classList.contains("light")) {
    document.getElementById("theme-toggle").textContent = "🌙";
  } else {
    document.getElementById("theme-toggle").textContent = "☀️";
  }
});
