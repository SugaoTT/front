import {
  Button,
  VStack,
  Image,
  HStack,
  Box,
  Divider,
  Center,
} from "@chakra-ui/react";

export default function ToolBar() {
  const open_in_new = () => {
    console.log("clicked open_in_new button!");
  };

  return (
    <HStack spacing="15px">
      <Box className="open_in_new" w="35px" h="35px" onClick={open_in_new}>
        <Image src="/open_in_new.svg"></Image>
      </Box>
      <Box className="save" w="35px" h="35px">
        <Image src="/save.svg"></Image>
      </Box>
      <Box className="arrow_back" w="35px" h="35px">
        <Image src="/arrow_back.svg"></Image>
      </Box>
      <Box className="arrow_forward" w="35px" h="35px">
        <Image src="/arrow_forward.svg"></Image>
      </Box>
      <Box className="backspace" w="35px" h="35px">
        <Image src="/backspace.svg"></Image>
      </Box>
      <Box className="zoom_in" w="35px" h="35px">
        <Image src="/zoom_in.svg"></Image>
      </Box>
      <Box className="zoom_out">
        <Image src="/zoom_out.svg" w="35px" h="35px"></Image>
      </Box>

      <Center height="35px">
        <Divider colorScheme="pink" orientation="vertical" />
      </Center>

      <Box className="cable" w="35px" h="35px">
        <Image src="/cable.svg"></Image>
      </Box>
      <Box className="rocket_launch" w="35px" h="35px">
        <Image src="/rocket_launch.svg"></Image>
      </Box>
    </HStack>
  );
}
