import { Flex, Input as ChakraInput } from '@chakra-ui/react'
import React from 'react'


interface InputProps {
    placeholder: string
    searchQuery: string
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
    handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

const Input = ({placeholder, searchQuery, setSearchQuery, handleKeyPress}: InputProps) => {
  return (
    <Flex alignItems="center" w="270px">
        <ChakraInput
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          _focus={{
            borderColor: "white",
            background: "gray.200",
            boxShadow: "none",
          }}
          mt="40px"
          h='60px'
          bg="gray.200"
          mx="auto"
          color="black"
          borderRadius="full"
        />
      </Flex>
  )
}

export default Input