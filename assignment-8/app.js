const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const offer = require("./models/offer.js");

mongoose.connect("mongodb://localhost/game_offer");

const app = express();
app.use(bodyParser());

app.get("/Offers", async (req, res) => {
  try {
    let search = `${req.query.attribute} : ${req.query.query}`;
    let offers = await offer.find({ search });
    let start = (req.query.page - 1) * req.query.records;
    let end = start + req.query.records;
    res.json(offers.slice(start, end));
  } catch (e) {
    console.log(e.message);
  }
});

app.delete("/Offers/:id", async (req, res) => {
  try {
    await offer.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({
      status: "success",
      message: "Offer Deleted",
    });
  } catch (e) {
    res.status(400).json({
      status: "Failure",
      message: e.message,
    });
  }
});

app.post("/Offers", async (req, res) => {
  try {
    await offer.create(req.body);
    res.status(200).json({
      status: "success",
      message: "Offer Created",
    });
  } catch (e) {
    res.send(e.message);
  }
});

app.post("/Offers/:id", async (req, res) => {
  try {
    await offer.updateOne({ _id: req.params.id }, req.body);
    res.status(200).json({
      status: "success",
      message: "Offer Updated",
    });
  } catch (e) {
    res.status(400).json({
      status: "Failure",
      message: e.message,
    });
  }
});

app.listen(3000, () => console.log("server running........."));
