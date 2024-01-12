const express = require("express");
const mongoos = require("mongoose");
const cors = require("cors");
const requestIp = require("request-ip");
require("dotenv").config();

const port = "3030";
const MONGO_CONNECT = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}mymongoinit.6md0cxy.mongodb.net/dalle?retryWrites=true&w=majority`;

const app = express();

const publicRoutes = require("./routes/public");

app.use(express.json());
app.use(cors());
app.use(requestIp.mw());
app.use(publicRoutes);

app.use((error, req, res, next) => {
  console.log("hi", error);

  const errorStatusCode = error.statusCode;
  const message = error.message;

  res
    .status(errorStatusCode || 500)
    .json({ message: message, error: "error", data: error });
});

mongoos
  .connect(MONGO_CONNECT)
  .then((result) => {
    app.listen(process.env.PORT || port, () => {
      console.log(`listning to the port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
