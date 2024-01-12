const User = require("../model/query");
require("dotenv").config();
const axios = require("axios");
const { validationResult } = require("express-validator");
const cloudinary = require("cloudinary").v2;
const CommunityModel = require("../model/community");
const community = require("../model/community");
const { Readable } = require("stream");

cloudinary.config({
  cloud_name: "dqone7ala",
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

exports.getApi = (req, res, next) => {
  res.status(200).json({ message: "Welcome to Dall-E 2 API" });
};

exports.dalleAPI = async (req, res, next) => {
  const query = req.body.query;
  const name = req.body.name;

  const error = validationResult(req);

  if (!error.isEmpty()) {
    const err = new Error("Invalid Input Data");
    err.statusCode = 403;
    return next(err);
  }

  const uniqueFileName =
    name + "-" + Date.now() + "-" + Math.round(Math.random() * 1e9);
  const filenameExtend = Math.floor(Math.random() * 100 + 100);

  const API_URL =
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1";

  try {
    const response = await axios.post(
      API_URL,
      { inputs: query + filenameExtend },
      {
        headers: {
          Authorization: process.env.API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    const buffer = Buffer.from(response.data, "binary");

    const imgOptions = {
      unique_filename: false,
      overwrite: true,
      public_id: "Dalle/image" + uniqueFileName,
    };

    const writeBuffer = cloudinary.uploader.upload_stream(
      imgOptions,
      (err, result) => {
        if (err) {
          const error = new Error("Server didn't respond");
          error.statusCode = 500;
          throw error;
        }

        const user = new User({
          ip: req.clientIp,
          name: name,
          query: query,
          imageUrl: result.secure_url,
        });

        user
          .save()
          .then((result) => {
            console.log(result);
            res.status(200).json({
              imageUrl: result.imageUrl,
              name: name,
              query: query,
            });
          })
          .catch((err) => {
            err.statusCode = err.statusCode || 500;
            throw err;
          });
      }
    );

    const readStream = Readable.from(buffer);
    readStream.pipe(writeBuffer);
  } catch (error) {
    error.statusCode = error.response?.status || 500;
    error.message = "Server didn't respond";
    next(error);
  }
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

exports.getCommunityDataByQuery = (req, res, next) => {
  const query = req.body.query;

  const nameCondition = {
    "communityData.name": { $regex: query, $options: "i" },
  };

  const promptCondition = {
    "communityData.query": { $regex: query, $options: "i" },
  };

  community
    .find({ $or: [nameCondition, promptCondition] })
    .then((result) => {
      res.status(200).json(result);
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(200).json({ message: "error" });
    });
};
