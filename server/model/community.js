const mongoos = require("mongoose");

const Schema = mongoos.Schema;

const communitySchema = new Schema({
  communityData: {
    type: Object,
    require: true,
  },
});

module.exports = mongoos.model("Community", communitySchema);
