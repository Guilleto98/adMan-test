import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Center,
  UnorderedList,
  ListItem,
  IconButton,
  Collapse,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import Input from "../components/Input";

interface SpotifySearchInputProps {
  placeholder?: string;
  onSearch: (query: string) => Promise<any[]>;
  albums: any[];
  setAlbums: React.Dispatch<React.SetStateAction<any[]>>;
}

const SpotifySearchInput: React.FC<SpotifySearchInputProps> = ({
  placeholder = "¿Qué te apetece escuchar?",
  onSearch,
  albums,
  setAlbums,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    if (searchQuery.trim() !== "") {
      const results = await onSearch(searchQuery);
      console.log(results);
      setAlbums(results);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const [expandedAlbum, setExpandedAlbum] = useState(null);

  const toggleAlbum = (index: any) => {
    if (expandedAlbum === index) {
      setExpandedAlbum(null);
    } else {
      setExpandedAlbum(index);
    }
  };

  function formatDuration(duration: number) {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);

    return `${minutes}:${seconds}`;
  }

  return (
    <Flex flexDir="column" alignItems="center" width="100%">
      <Input
        placeholder={placeholder}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleKeyPress={handleKeyPress}
      />
      <Center w="100%">
        <Box width="80%" color="white">
          {albums.map(({ name, tracks }, index) => (
            <Box
              key={index}
              borderBottom="1px solid #ccc"
              padding="10px"
              width="100%"
              display="flex"
              flexDirection="column"
            >
              <Flex
                justifyContent="space-between"
                alignItems="center"
                cursor="pointer"
                onClick={() => toggleAlbum(index)}
              >
                <Text fontSize="xl" fontWeight="bold">
                  {name}
                </Text>
                {expandedAlbum === index ? (
                  <IconButton
                    icon={<ChevronUpIcon />}
                    aria-label="Cerrar álbum"
                    colorScheme="blue"
                  />
                ) : (
                  <IconButton
                    icon={<ChevronDownIcon />}
                    aria-label="Expandir álbum"
                    colorScheme="blue"
                  />
                )}
              </Flex>
              <Collapse in={expandedAlbum === index}>
                <UnorderedList>
                  {tracks.map((track: any, trackIndex: number) => (
                    <ListItem key={trackIndex}>
                      <Text>{track.name}</Text>
                      <Text fontSize="sm" color="gray.500">
                        Duración: {formatDuration(track.duration)}
                      </Text>
                    </ListItem>
                  ))}
                </UnorderedList>
              </Collapse>
            </Box>
          ))}
        </Box>
      </Center>
      ; ;
    </Flex>
  );
};

export default SpotifySearchInput;
