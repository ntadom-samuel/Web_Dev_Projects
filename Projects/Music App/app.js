const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

// I had to add "music-app?retryWrites=true" to allow it create a new document in my music app collection
const DB = `mongodb+srv://samuelntadom8:${process.env.DATABASE_PASSWORD}@cluster0.xmbmhq9.mongodb.net/music-app?retryWrites=true`;
//Connecting to my database
mongoose.connect(DB).then(() => console.log("DB connection successful"));

//Creating a Schema
const dataSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    maxLength: [40, "Password must be at most 40 characters."],
    minLength: [10, "Password must be at least 10 characters."],
  },
  friends: [String],
  followers: [String],
  playlist: [Object],
});

//Manually update my database
let User = mongoose.model("User", dataSchema);

// const newUser = new User({
//   user_name: "Samuel Ntadom",
//   password: "Adventure 123!",
//   friends: ["Josh"],
//   followers: ["Elon Musk"],
//   playlist: [{ song_name: "Z", song_author: "Sam" }],
// })
//   .save()
//   .then((doc) => console.log(doc))
//   .catch((err) => console.log(`Error:`, err));

module.exports = User;
