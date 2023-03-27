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

export default function Memo() {
  return (
    <>
      <VStack spacing="24px">
        <Text fontSize="xl">メモ: </Text>
        <Textarea />
      </VStack>
    </>
  );
}
