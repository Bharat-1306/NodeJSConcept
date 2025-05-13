const app = require("./expressServer"); // Import the express app instance

app.listen(3000, () => {
  console.log("Server is running on port 3000"); // Start the server and listen on port 3000
}
); // This will start the server and listen for incoming requests on port 3000
// This is the main entry point of the application
// This is where we start the server and listen for incoming requests