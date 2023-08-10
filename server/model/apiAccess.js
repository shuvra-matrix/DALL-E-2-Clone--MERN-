const mongoos = require("mongoose");
const Schema = mongoos.Schema;

const apiAccess = new Schema({
  host: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    require: true,
  },
});

module.exports = mongoos.model("ApiAccess", apiAccess);
