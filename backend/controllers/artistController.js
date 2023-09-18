const { spotifySearch } = require("../services/services");

const artistController = async (req, res) => {
  try {
    const artist = await spotifySearch();
    res.send(artist);
  } catch (error) {
    console.error('Error:', error);
  }
};

module.exports = artistController;
