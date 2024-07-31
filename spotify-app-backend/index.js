import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import { Albums } from "./models/albumsModel.js";

const app = express();

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

app.post("/albums", async (request, response) => {
  try {
    if (
      !request.body.one ||
      !request.body.two ||
      !request.body.three ||
      !request.body.four
    ) {
      return response.status(400).send({
        message: "Send all required fields: one, two, three, and four",
      });
    }
    const newAlbum = {
      one: request.body.one,
      two: request.body.two,
      three: request.body.three,
      four: request.body.four,
    };
    const album = await Albums.create(newAlbum);

    return response.status(201).send(album);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

app.post("/albumsUpdate", async (request, response) => {
  try {
    if (
      !request.body.one ||
      !request.body.two ||
      !request.body.three ||
      !request.body.four
    ) {
      return response.status(400).send({
        message: "Send all required fields: one, two, three, and four",
      });
    }
    const updatedAlbum = {
      one: request.body.one,
      two: request.body.two,
      three: request.body.three,
      four: request.body.four,
    };

    // Replace `yourUniqueIdentifier` with the actual identifier you use
    const filter = { _id: "66a9d1828fb1ffaa63f4ed3c" };

    // Update the existing document or create one if it doesn't exist
    const result = await Albums.updateOne(filter, updatedAlbum, {
      upsert: true, // This option creates the document if it does not exist
    });

    if (result.matchedCount === 0 && result.upsertedCount === 0) {
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

//E:\Programming\Spotify-app\spotify-app-backend
