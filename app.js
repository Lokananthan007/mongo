require("./config/database").connect();
const parser = require('body-parser');
const express = require("express");
const app = express();



app.get("/", async (req, res) => {
    console.log("Client connected");
    res.status(201).json({ message: "Connected" });
  });
  
  const port = 8080;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  