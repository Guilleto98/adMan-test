require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { getToken, spotifySearch } = require("./services/services");
const bodyParser = require("body-parser");

const mysql = require('mysql2')
const connection = require('./db');

const sql = 'INSERT INTO searchHistory (inputText) VALUES (?)';

const app = express();
const PORT = 3000;

connection.connect((error) => {
  if (error) {
    console.error('Error de conexión a la base de datos:', error);
  } else {
    console.log('Conexión exitosa a la base de datos MySQL');
  }
});


app.use(cors());
app.use(bodyParser.json());

app.get("/api/artist", async (req, res) => {
  const artist = await spotifySearch();
  console.log(artist);
  res.send(artist);
});

app.post("/api/search", async (req, res) => {
  const response = await spotifySearch(req.body.search);
  console.log(response)
  res.send(response);
  try {
  connection.query(sql, [req.body.search], (err, result) => {
    if (err) {
      console.error("Error al insertar en la base de datos:", err);
    } else {
      console.log("Datos insertados en la base de datos");
    }
    
    // Cierra la conexión después de completar la consulta
    connection.end();
  });
} catch (error) {
  console.error("Error inesperado:", error);
}

});


app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});