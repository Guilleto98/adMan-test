require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { getToken, spotifySearch } = require("./services/services");
const bodyParser = require("body-parser");

const mysql = require("mysql2");
const connection = require("./db");

const insertQuery = "INSERT INTO searchHistory (inputText) VALUES (?)";

const app = express();
const PORT = 3000;

connection.connect((error) => {
  if (error) {
    console.error("Error connecting with DB:", error);
  } else {
    console.log("Successfully connected to DB");
  }
});

app.use(cors());
app.use(bodyParser.json());

app.get("/api/artist", async (req, res) => {
  const artist = await spotifySearch();
  res.send(artist);
});

app.post("/api/search", async (req, res) => {
  const response = await spotifySearch(req.body.search);

  try {
    connection.query(insertQuery, [req.body.search], (err, result) => {
      if (err) {
        console.error("Error to add on DB:", err);
      } else {
        console.log("Data insert on DB");
      }
      res.send(response);
    });
  } catch (error) {
    console.error("Error:", error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`);
});
