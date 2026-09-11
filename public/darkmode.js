// ================================================
// DARK MODE
// ================================================

const darkModeButton = document.getElementById("darkmode");


// Check if the button exists
if (darkModeButton) {

    darkModeButton.addEventListener("click", function () {

        // Add/remove dark-mode class
        document.body.classList.toggle("dark-mode");


        // Check current mode
        const darkModeEnabled =
            document.body.classList.contains("dark-mode");


        // Change button text
        if (darkModeEnabled) {

            darkModeButton.textContent = "☀️ Light Mode";

        } else {

            darkModeButton.textContent = "🌙 Dark Mode";

        }

    });

}