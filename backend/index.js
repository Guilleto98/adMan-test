require("dotenv").config();
const express = require("express");
const { getToken, spotifySearch } = require("./controllers/Controllers");
const app = express();
const port = 3000;

app.get("/artist", async (req, res) => {
  const artist = await spotifySearch();
  res.send(artist);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
