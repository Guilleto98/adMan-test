const connection = require('../db');
const {spotifySearch } = require("../services/services");


const searchController = async (req, res) => {
  const { search } = req.body;

  try {
    const response = await spotifySearch(search);
    const insertQuery = 'INSERT INTO searchHistory (inputText) VALUES (?)';

    connection.query(insertQuery, [search], (err, result) => {
      if (err) {
        console.error('Error to add on DB:', err);
      } else {
        console.log('Data insert on DB');
      }
      res.send(response);
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = searchController;
