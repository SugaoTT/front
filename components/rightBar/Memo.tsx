import {
  Input,
  Stack,
  VStack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Box,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { SearchIcon, CheckIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useState, useRef } from "react";
import { StateContext } from "../context/StateContext";

export default function Memo() {
  const { memoContent, changeMemoContent } = useContext(StateContext);

  let handleMemoChange = (e: any) => {
    changeMemoContent(e.target.value);
  };

  return (
    <>
      <VStack spacing="24px">
        <Text fontSize="xl">メモ: </Text>
        <Textarea
          border="1px"
          bg="whiteAlpha.100"
          rows={5}
          width="90%"
          value={memoContent}
          onChange={handleMemoChange}
        />
      </VStack>
    </>
  );
}
