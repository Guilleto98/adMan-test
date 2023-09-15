import { useState } from "react";
import SpotifySearchInput from "./home";
import { getSpotifyResults } from "./services/searchService";
import background from '/imgs/background.jpg'
import background2 from '/imgs/background2.jpg'
import { Box } from "@chakra-ui/react";

const App = () => {
  const [albums, setAlbums] = useState<any[]>([]);
  const [currentBackground, setCurrentBackground] = useState(1);
  const backgrounds = [background, background2];

  const toggleBackground = (hasData: boolean) => {
    if(hasData){
      setCurrentBackground(2)
    }else{
      setCurrentBackground(1)
    }
  };


  // Estilos para la imagen de fondo
  const backgroundStyles = {
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <Box
      backgroundImage={backgrounds[currentBackground - 1]}
      backgroundSize={backgroundStyles.backgroundSize}
      backgroundPosition={backgroundStyles.backgroundPosition}
      backgroundRepeat={backgroundStyles.backgroundRepeat}
      w='full'
      minH={"100vh"}
      h='full'
    >
      <SpotifySearchInput
        onSearch={getSpotifyResults}
        albums={albums}
        setAlbums={setAlbums}
        toggleBackground={toggleBackground}
      />
    </Box>
  )
};

export default App;

