const express = require("express");
const mysql = require("mysql2");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));


// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sabacr2005",
    database: "pdf_website_feeback"
});


// Connect MySQL
db.connect(function(error) {

    if (error) {
        console.log("MySQL connection failed");
        console.log(error.message);
    } 
    else {
        console.log("MySQL connected successfully");
    }

});


// Student submission
app.post("/api/students", function(req, res) {

    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;


    if (!name || !email ) {

        return res.status(400).json({
            message: "Please fill all required fields."
        });

    }


    const sql = `
        INSERT INTO students
        (name, email, message)
        VALUES (?, ?, ?)
    `;


    db.query(
        sql,
        [name, email, message],
        function(error) {

            if (error) {

                console.log(error);

                return res.status(500).json({
                    message: "Database error."
                });

            }


            res.json({
                message: " submitted successfully!"
            });

        }
    );

});


// Get students for admin
app.get("/api/students", function(req, res) {

    const sql = `
        SELECT *
        FROM students
        ORDER BY id DESC
    `;


    db.query(sql, function(error, results) {

        if (error) {

            return res.status(500).json({
                message: "Database error."
            });

        }


        res.json(results);

    });

});


// Start server
app.listen(3000, function() {

    console.log(
        "Server running at http://localhost:3000"
    );

});