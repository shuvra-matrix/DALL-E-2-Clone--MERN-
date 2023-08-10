const mongoos = require("mongoose");

const Schema = mongoos.Schema;

const communitySchema = new Schema({
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
});

module.exports = mongoos.model("Community", communitySchema);
