const form = document.getElementById("feedbackform");

const result = document.getElementById("result");


form.addEventListener("submit", async function (event) {

    // Stop page refreshing
    event.preventDefault();

    // Create student data
    const student = {

        name:
            document.getElementById("name").value,

        email:
            document.getElementById("email").value,


        message:
            document.getElementById("feedback").value

    };


    try {


        // Send data to Node.js
        const response = await fetch(
            "/api/students",
            {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(student)

            }
        );


        // Get response
        const data =
            await response.json();


        if (response.ok) {

            result.textContent =
                data.message;

            result.style.color =
                "green";


            // Clear form
            form.reset();

        }

        else {

            result.textContent =
                data.message;

            result.style.color =
                "red";

        }


    }

    catch (error) {

        console.log(error);

        result.textContent =
            "Cannot connect to server.";

        result.style.color =
            "red";

    }

});