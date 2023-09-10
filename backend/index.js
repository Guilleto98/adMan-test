require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { getToken, spotifySearch } = require("./controllers/Controllers");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;
app.use(cors());
app.use(bodyParser.json());

app.get("/api/artist", async (req, res) => {
  const artist = await spotifySearch();
  console.log(artist);
  res.send(artist);
});

app.post("/api/search", async (req, res) => {
  console.log(req.body);
  const response = await spotifySearch(req.body.search);
  console.log(response);
  res.send(response);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
