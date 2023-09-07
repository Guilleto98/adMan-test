const axios = require("axios");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
// todo: move to a better place
const ACCESS_TOKEN_URL = "https://accounts.spotify.com/api/token";

const getToken = async () => {
  const { data } = await axios.post(
    ACCESS_TOKEN_URL,
    `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return data.access_token;
};

const getAlbums = () => {};

module.exports = { getToken, getAlbums };
