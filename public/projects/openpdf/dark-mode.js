// ==========================================
// OPENPDF - DARK MODE
// Completely separate from script.js
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const button = document.createElement("button");

    button.className = "dark-mode-toggle";

    button.textContent = "🌙 Dark";

    document.querySelector(".navbar").appendChild(button);


    button.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");


        if (document.body.classList.contains("dark-mode")) {

            button.textContent = "☀️ Light";

        } else {

            button.textContent = "🌙 Dark";

        }

    });

});