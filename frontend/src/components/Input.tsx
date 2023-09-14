import { Flex, Input as ChakraInput } from "@chakra-ui/react";
import React from "react";

interface InputProps {
  placeholder: string;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input = ({
  placeholder,
  searchQuery,
  setSearchQuery,
  handleKeyPress,
}: InputProps) => {
  return (
    <Flex alignItems="center" w="300px">
      <ChakraInput
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        _focus={{
          border: "1px",
          borderColor: "white",
          boxShadow: "none",
        }}
        mt="40px"
        h="60px"
        mx="auto"
        border='none'
        color="white"
        borderRadius="full"
        bg="rgba(192, 192, 192, 0.2)"
        backdropFilter="blur(5px)"
        _placeholder={{
            color: "white",
          }}
      />
    </Flex>
  );
};

export default Input;
