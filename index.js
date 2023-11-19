const parser = require('body-parser');
const express = require("express");
require("./config/database").connect();
var cors = require('cors')
const  UserDetails= require('./model/del-model');


const app = express()
app.use(parser.urlencoded({ extended: true, limit: '40mb' }));
app.use(parser.json({ limit: '40mb', extended: false }
))
app.use(cors())

app.get("/", async (req, res) => {
    console.log("client connected")
    res.status(201).json({ message: "connected"});
  });
  app.post("/insert", async (req, res) => {
    try {
      const newData = new UserDetails({
        empname: req.body.empname,
        location: req.body.location,
        email: req.body.email,
      });
  
      await newData.save();
  
      res.status(201).json({ message: "Data inserted successfully" });
    } catch (error) {
      console.error("Error inserting data: " + error);
      res.status(500).json({ message: "Error inserting data" });
    }
  });
  app.get("/view", async (req, res) => {
    try {
      const data = await UserDetails.find();
  
      res.status(200).json(data);
    } catch (error) {
      console.error("Error retrieving data: " + error);
      res.status(500).json({ message: "Error retrieving data" });
    }
  });
  app.post("/updateEmail/:id", async (req, res) => {
    try {
      const userId = req.params.id;
      const newEmail = req.body.email;
  
      const user = await UserDetails.findByIdAndUpdate(userId, { email: newEmail });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "Email updated successfully" });
    } catch (error) {
      console.error("Error updating email: " + error);
      res.status(500).json({ message: "Error updating email" });
    }
  });


app.listen(5050, () => {
    console.log('Server running ');
});