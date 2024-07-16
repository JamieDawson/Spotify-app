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
