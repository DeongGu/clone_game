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

await Rank.create({ score: 40, name: "test" });

app.listen(4000);
