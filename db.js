const express = require("express");
const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const app = express();
mongoose.connect("mongodb://localhost:27017/bricks-crash");

const rankSchema = new Schema(
  {
    score: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Rank = mongoose.model("Rank", rankSchema);

Rank.create({ score: scoreNumber, name: userName });

app.listen(4000);
