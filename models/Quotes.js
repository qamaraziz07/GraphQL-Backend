const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const quoteSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Quote", quoteSchema);
