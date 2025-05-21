// Converting the app to use Typescript

// const express = require("express");
import express from "express"; // Import the express module

import router from "./routes"; // Import the router module

import morgan from "morgan"; // Import the morgan module for logging -- acts like a middle ware

import cors from "cors"; // Import the cors module for Cross-Origin Resource Sharing

import { protect } from "./modules/auth";

import { createNewUser, signin } from "./handlers/user";

const app = express(); // Create an instance of express

//todo: how do we use it 
app.use(cors()); // Use cors middleware to enable Cross-Origin Resource Sharing
// it is a middleware that enables Cross-Origin Resource Sharing
// it is used to allow cross-origin requests from the client to the server

app.use(morgan("dev")); // Use morgan middleware for logging requests in development mode
//it loggs all the requests that are made to the server
// it is a middleware that logs the requests to the console

app.use(express.json()); // Use express.json() middleware to parse JSON request bodies
// it is a middleware that parses the JSON request bodies and makes them available in req.body
// it is used to parse the JSON request bodies and make them available in req.body

app.use(express.urlencoded({ extended: true })); // Use express.urlencoded() middleware to parse URL-encoded request bodies
// it is a middleware that parses the URL-encoded request bodies and makes them available in req.body
// it is used to parse the URL-encoded request bodies and make them available in req.body


//custom middleware
app.use((req, res, next) => {
  console.log("Custom middleware"); 
  // This middleware function logs a message to the console
  req.something = "something"; // Add a custom property to the request object
  //can use this req in the roter as the request is passed from here only
  next(); // Call the next middleware function in the stack
  //why do we write next() here?
  // The next() function is a callback function that tells express to move on to the next middleware function in the stack
  // If you don't call next(), the request will hang and not be processed
  // The next() function is a function that is passed to the middleware function as an argument
  // It is used to pass control to the next middleware function in the stack
})

const customLogger =(message) => (req, res, next) => {
console.log(`Hello from ${message} ${req.method} ${req.url}`);
next()
/**
 * here one scenario i have faced , when i have adde protect to call the api , then i havent added next() bcs of which 
 * my api is not accessible , so when ever a custom logger is added we need to add next() to it
 */
}

app.use(customLogger("Custom Logger")); // Use the custom logger middleware

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



// /api is complusary to keep to triger the endpoints
app.use('/api',protect ,  router) //todo:use is used for 
//here protect is like a middle ware
//so here baseically before acewsing the any api , we need to pass theought the middle wae where we need to give the token

app.post('/user' ,createNewUser)
app.post('/signin', signin)

// module.exports = app; 
export default app; 

// Export the app instance for use in other files
// This allows us to use the app instance in other files, such as the server file
// This is useful for testing or for separating concerns in our code
// The app instance is the main object that represents our express application
// It is used to define routes, middleware, and other application-level settings
// The app instance is created by calling the express() function
// The express() function returns an instance of the express application

//imp : to view the data base what updates we need , in terminal add - npx prisma studio -x