import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"; // Import the cors package
import { PORT, mongoDBURL } from "./config.js";
import { Albums } from "./models/albumsModel.js";

const app = express();

// Use the CORS middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("connected to mongodb database!!!");
    app.listen(PORT, () => {
      console.log(`PORT IS ON ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.post("/albumsUpdate", async (request, response) => {
  try {
    const updates = {};

    // Add only the fields that are present in the request body to the updates object
    if (request.body.one !== undefined) updates.one = request.body.one;
    if (request.body.two !== undefined) updates.two = request.body.two;
    if (request.body.three !== undefined) updates.three = request.body.three;
    if (request.body.four !== undefined) updates.four = request.body.four;

    if (Object.keys(updates).length === 0) {
      return response.status(400).send({
        message: "No fields to update",
      });
    }

    // Replace `yourUniqueIdentifier` with the actual identifier you use
    const filter = { _id: "66a9d1828fb1ffaa63f4ed3c" };

    // Update the existing document only; do not create a new document
    const result = await Albums.updateOne(filter, { $set: updates });

    if (result.matchedCount === 0) {
      return response.status(404).send({ message: "Document not found" });
    }

    // Fetch the updated document
    const album = await Albums.findOne(filter);

    return response.status(200).send(album);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

app.get("/getAlbum", async (request, response) => {
  try {
    // Find the document with the given ID
    const album = await Albums.findOne({ _id: "66a9d1828fb1ffaa63f4ed3c" });

    if (!album) {
      return response.status(404).send({ message: "Document not found" });
    }

    // Send the found document as the response
    return response.status(200).send(album);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
