const mongoos = require("mongoose");

const Schema = mongoos.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  query: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
});

module.exports = mongoos.model("User", userSchema);
