import { useState } from "react";
import SpotifySearchInput from "./home";
import { getSpotifyResults } from "./services/searchService";
import { Flex } from "@chakra-ui/react";

const App = () => {
  const [albums, setAlbums] = useState<any[]>([]);
  return (
    <Flex bg='#000' w='full' minH={"100vh"} h='full'>
      <SpotifySearchInput
        onSearch={getSpotifyResults}
        albums={albums}
        setAlbums={setAlbums}
      />
    </Flex>
  )
};

export default App;
