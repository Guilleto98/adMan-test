import SpotifySearchInput from "./home";
import { getSpotifyResults } from "./services/searchService";

const App = () => {
  return <SpotifySearchInput onSearch={getSpotifyResults} />;
};

export default App;
