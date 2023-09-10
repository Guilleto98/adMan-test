import axios from "axios";

const searchApiUrl = "http://localhost:3000/api/search";

export const getSpotifyResults = async (searchValue: string) => {
  const { data } = await axios.post(searchApiUrl, {
    search: searchValue,
  });

  return data;
};
