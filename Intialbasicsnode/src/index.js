const http = require("http");
//http is taking care of request and response 
// it is like when ever the server is created , it is like a event driven architecture
// so when even someone makes a request to server it is an event 


const server = http.createServer(async (req, res) => {
  //the res object is scoped to the req object 
  //check the req and res what we get basically
  console.log("Request received" , req);
  console.log("response " , res)
  if (req.method === "GET" && req.url === "/") {
    // res.statusCode(200); 
    // when ipening the page we are getting error as res.status code is not a function , we can use this in express
    //can add the console logs here
    res.end();
  }
});

server.listen(3001 , () => {
    console.log("Server is running on port 3001");
})
