require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const app = express();
mongoose.connect(process.env.DB_ADRESS);

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

Rank.create({ score: 50, name: "test1" });

app.listen(4000);
