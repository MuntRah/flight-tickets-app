const express = require("express");
const router = express.Router();

const User = require("../models/user");
const { render } = require("ejs");
const VALID_TYPES = ["One-Way", "Transit", "Round-Trip"];
const VALID_LEVELS = ["First", "Economy", "Business"];

router.get("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    res.render("tickets/index.ejs", {
      tickets: currentUser.tickets,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/new", (req, res) => {
  res.render("tickets/new.ejs");
});

router.post("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    req.body.date = new Date(req.body.date);
    currentUser.tickets.push(req.body);

    await currentUser.save();

    res.redirect(`/users/${currentUser._id}/tickets`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/:ticketId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const ticket = currentUser.tickets.id(req.params.ticketId);
    res.render("tickets/edit.ejs", {
      ticket: ticket,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.delete("/:ticketId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    currentUser.tickets.id(req.params.ticketId).deleteOne();

    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/tickets`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/:ticketId/edit", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const ticket = currentUser.tickets.id(req.params.ticketId);
    res.render("tickets/edit.ejs", {
      ticket: ticket,
      user: currentUser, // Pass the user if needed for the form action
      VALID_TYPES: VALID_TYPES, // Pass VALID_TYPES
      VALID_LEVELS: VALID_LEVELS, // Pass VALID_LEVELS
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.put("/:ticketId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const ticket = currentUser.tickets.id(req.params.ticketId);

    ticket.set(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/tickets/`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});
module.exports = router;
