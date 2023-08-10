const ApiAccess = require("../model/apiAccess");
const Query = require("../model/query");
require("dotenv").config();
const axios = require("axios");

exports.getApi = (req, res, next) => {
  res.status(200).json({ message: "Welcome to Dall-E 2 API" });
  console.log(req.getHeader);
};

exports.dalleAPI = async (req, res, next) => {
  const API = process.env.API_LIST.split(",");
  const host = req.headers["dalle-host"] || "";
  const key = req.headers["dalle-key"] || "";
  const query = req.body;
  console.log(host);
  console.log(key);
  console.log(query);

  ApiAccess.find({ _id: process.env.API_ID }).then((result) => {
    const serverKey = result[0].key;
    const serverHost = result[0].host;

    if (
      serverHost.toString() === host.toString() &&
      serverKey.toString() === key.toString()
    ) {
      const options = {
        method: "POST",
        url: "https://openai80.p.rapidapi.com/images/generations",
        headers: {
          "content-type": "application/json",
          "Accept-Encoding": "gzip,deflate,compress",
          "X-RapidAPI-Key": API[0].trim(),
          "X-RapidAPI-Host": "openai80.p.rapidapi.com",
        },
        data: {
          prompt: "A cute baby sea otter",
          n: 1,
          size: "1024x1024",
        },
      };

      try {
        axios
          .request(options)
          .then((response) => {
            res.status(200).json({ imageUrl: response.data });
          })
          .catch((error) => {
            res.status(500).json({ message: "Server did't respond" });
          });
      } catch (error) {
        res.status(500).json({ message: "Server did't respond" });
      }
    } else {
      res.status(500).json({ message: "Invalid Credentials" });
    }
  });
};
