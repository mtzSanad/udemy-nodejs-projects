//const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");

// First we create app and pass it to server
//Init express as funciton invocation and we pass it to server
const app = express();

//Parser should be at begining of middlwares
app.use(bodyParser.urlencoded({ extended: false }));

//Creates middleware, it takes a function that will be excuted for every request
// next is a function that will be excuted to allow calling another function
// Path is part of thats why we added /add before / or else it will go through /
app.use("/add", (req, res, next) => {
  //This will be logged and browser will spin coz no response
  console.log("In middle ware");

  //Calling next will call the next middleware in order from top to buttom
  next();
});

app.use("/form", (req, res, next) => {
  res.send(
    '<form action="/product" method="POST"><input type="text" name="product" /><input type="submit" value="Send Request"></form>'
  );
});

app.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

// By default if path is not speified it routes to /
app.use("/", (req, res, next) => {
  console.log("Another middle ware");

  //This replaces res.write and res.header
  res.send("<h1>Hello</h1>");
});

//app is valid request handler
//const server = http.createServer(app);

//server.listen(3001);

// This replaces server and server listen
app.listen(3001);
