const axios = require("axios");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
// todo: move to a better place
const ACCESS_TOKEN_URL = "https://accounts.spotify.com/api/token";

// TODO: take albums details from> https://developer.spotify.com/documentation/web-api/reference/get-multiple-albums

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

const getAlbumsByIds = async (albumIds, accessToken) => {
  // Define the API endpoint
  const apiUrl = "https://api.spotify.com/v1/albums";

  // Define the request headers, including the Authorization header with the access token
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    // Send the GET request using Axios
    const response = await axios.get(`${apiUrl}?ids=${albumIds.join(",")}`, {
      headers,
    });

    // Return the response data
    return response.data;
  } catch (error) {
    // Handle any errors here
    console.error("Error:", error);
    throw error;
  }
};

const mapInfoToFrontend = (info) => {
  // i need img, name, duration

  const infoToFrontend = info.map((album) => {
    const data = {
      name: album.name,
      tracks: album.tracks.items.map(({ duration_ms, name }) => ({
        name,
        duration: duration_ms / 1000,
      })),
    };
    return data;
  });

  return infoToFrontend;
};

const spotifySearch = async (searchValue) => {
  const token = await getToken();
  const scapedSearchValue = encodeURIComponent(searchValue);
  const SEARCH_ARTIST = `https://api.spotify.com/v1/search?q=${scapedSearchValue}&type=album`;

  const { data } = await axios.get(SEARCH_ARTIST, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const matchingAlbunIds = data.albums.items.map((album) => album.id);

  const albumsDetail = await getAlbumsByIds(matchingAlbunIds, token);

  const sortedAlbums = albumsDetail.albums.sort(
    (a, b) => b.popularity - a.popularity
  );
  
  const requiredInfo = mapInfoToFrontend(sortedAlbums);
  console.log("requiredInfo: ", requiredInfo);
  return requiredInfo;
};

module.exports = { getToken, spotifySearch };
