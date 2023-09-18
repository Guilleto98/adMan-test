require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { getToken, spotifySearch } = require("./services/services");
const bodyParser = require("body-parser");
const searchController = require('./controllers/searchController');
const artistController = require('./controllers/artistController')


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

app.get("/api/artist", artistController);

app.post("/api/search", searchController);

app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`);
});
