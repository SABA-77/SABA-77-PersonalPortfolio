const darkModeButton = document.querySelector(".dark-mode-btn");

darkModeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        darkModeButton.textContent = "☀️ Light Mode";
    } else {
        darkModeButton.textContent = "🌙 Dark Mode";
    }
});