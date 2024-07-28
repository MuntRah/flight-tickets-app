const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["One-Way", "Transit", "Round-Trip"],
  },
  level: {
    type: String, 
    required: true,
    enum: ["First", "Economy", "Business"], 
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tickets: [ticketSchema], 
});

const User = mongoose.model("User", userSchema);

module.exports = User;
