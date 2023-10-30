const ApiAccess = require("../model/apiAccess");
const User = require("../model/query");
require("dotenv").config();
const axios = require("axios");
const { validationResult } = require("express-validator");
const cloudinary = require("cloudinary").v2;
const CommunityModel = require("../model/community");

cloudinary.config({
  cloud_name: "dqone7ala",
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

exports.getApi = (req, res, next) => {
  res.status(200).json({ message: "Welcome to Dall-E 2 API" });
};

exports.dalleAPI = async (req, res, next) => {
  const API = process.env.API_LIST.split(",");
  const host = req.headers["dalle-host"] || "";
  const key = req.headers["dalle-key"] || "";
  const query = req.body.query;
  const name = req.body.name;

  const error = validationResult(req);

  if (!error.isEmpty()) {
    console.log(error.array());
    return res.status(500).json({
      error: "error",
      message: "Invalid Input Data",
    });
  }

  let currentApiIndex = req.global[0]["apikeyindex"];
  let maxApiIndex = req.global[0]["maxApiKey"];

  if (currentApiIndex === maxApiIndex) {
    req.global[0]["apikeyindex"] = 0;
    req.global[0]
      .save()
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
    currentApiIndex = req.global[0]["apikeyindex"];
  }

  console.log(query);
  console.log(name);

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
          "X-RapidAPI-Key": API[currentApiIndex].trim(),
          "X-RapidAPI-Host": "openai80.p.rapidapi.com",
        },
        data: {
          prompt: query,
          n: 1,
          size: "1024x1024",
        },
      };

      try {
        axios
          .request(options)
          .then((response) => {
            const remainingToken =
              response.headers["x-ratelimit-tokens-remaining"];
            console.log(remainingToken);
            if (remainingToken <= 1000) {
              req.global[0].apikeyindex = currentApiIndex + 1;
              req.global[0].save().then((res) => {
                ///
              });
            }

            const options = {
              unique_filename: true,
              overwrite: true,
              public_id: "Dalle/image" + name,
            };

            cloudinary.uploader.upload(
              response.data.data[0]["url"],
              options,
              (error, result) => {
                if (error) {
                  return res
                    .status(500)
                    .json({ message: "Server did't respond", error: "error" });
                }
                const user = new User({
                  ip: req.clientIp,
                  name: name,
                  query: query,
                  imageUrl: result["secure_url"],
                });
                user
                  .save()
                  .then((result) => {
                    console.log(result);
                  })
                  .catch((err) => {
                    console.log(err);
                  });

                res.status(200).json({
                  imageUrl: result["secure_url"],
                  name: name,
                  query: query,
                });
              }
            );
          })
          .catch((error) => {
            console.log(error);
            res
              .status(500)
              .json({ message: "Server did't respond", error: "error" });
          });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Server did't respond", error: "error" });
      }
    } else {
      res.status(500).json({ message: "Invalid Credentials", error: "error" });
    }
  });
};

exports.getCommunityData = (req, res, next) => {
  CommunityModel.find()
    .sort({ _id: -1 })
    .limit(40)
    .then((data) => {
      console.log("hi");
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.sendCommunity = (req, res, next) => {
  const queryData = req.body.queryResult;

  const community = new CommunityModel({
    communityData: queryData,
  });

  community
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "done" });
    })
    .catch((err) => {
      console.log(err);
      res.status(200).json({ message: "error" });
    });
};
