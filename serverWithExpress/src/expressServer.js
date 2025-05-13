const express = require("express");

const app = express(); // Create an instance of express

app.get("/", (req, res) => {
  console.log("Request received");
  res.send("Hello World"); // Send a plain text response
  res.status(200); // Set the response status code
  //200 - 300 are typically a success code
  // 400 are typically reserved for user error based like wrong password , wrong email etc..
  // 500 are typically reserved for server errors like database down etc..
  res.json({
    message: "Hello World",
  }); // Send a JSON response
});

module.exports = app; // Export the app instance for use in other files
// This allows us to use the app instance in other files, such as the server file
// This is useful for testing or for separating concerns in our code
// The app instance is the main object that represents our express application
// It is used to define routes, middleware, and other application-level settings
// The app instance is created by calling the express() function
// The express() function returns an instance of the express application
