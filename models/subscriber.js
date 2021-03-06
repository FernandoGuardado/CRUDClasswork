"use strict";

const mongoose = require("mongoose"),
  subscriberSchema = mongoose.Schema(
    {
      name: {
        first: {
          type: String,
          required: true,
        },
        last: {
          type: String,
          required: true,
        },
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
      },
      zipCode: {
        type: Number,
        min: [10000, "Zip code too short"],
        max: 99999,
      },
      courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    },
    {
      timestamps: true,
    }
  );

subscriberSchema.virtual("fullName").get(function () {
  return `${this.name.first} ${this.name.last}`;
});

subscriberSchema.methods.getInfo = function () {
  return `Name: ${this.name.first} ${this.name.last} Email: ${this.email} Zipcode: ${this.zipCode}`;
};

module.exports = mongoose.model("Subscriber", subscriberSchema);
