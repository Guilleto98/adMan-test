import React, { useState } from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  IconButton,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

interface SpotifySearchInputProps {
  placeholder?: string;
  onSearch: (query: string) => { albums: any[] };
}

const SpotifySearchInput: React.FC<SpotifySearchInputProps> = ({
  placeholder = "Buscar en Spotify",
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [albums, setAlbums] = useState<any[]>([]);

  const handleSearch = async () => {
    if (searchQuery.trim() !== "") {
      const results = await onSearch(searchQuery);

      setAlbums(results.albums);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={SearchIcon} color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          _focus={{
            borderColor: "white",
            background: "gray.200", // Fondo gris
            boxShadow: "none",
          }}
          bg="transparent" // Fondo transparente
          mx="auto" // Centrado horizontal
          maxWidth="300px" // Anchura máxima
          color="white" // Texto blanco
          borderRadius="full" // Borde redondeado
        />
        <Box ml={2}>
          <IconButton
            aria-label="Buscar"
            icon={<SearchIcon />}
            colorScheme="green"
            onClick={handleSearch}
          />
        </Box>
      </InputGroup>
      <Flex>
        {albums.map(({ label, name }) => (
          <Flex>
            {label}
            {name}
          </Flex>
        ))}
      </Flex>
    </>
  );
};

export default SpotifySearchInput;
