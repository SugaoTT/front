import {
  Input,
  Stack,
  VStack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Box,
  Image,
} from "@chakra-ui/react";
import { SearchIcon, CheckIcon } from "@chakra-ui/icons";

export default function LeftBar() {
  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    console.log("non drag start", e);
    //console.log(e.dataTransfer.setDragImage)
    console.log(e.currentTarget.className);

    let nodeName = e.currentTarget.className;
    if (nodeName.includes("Router")) {
      e.dataTransfer!.setData("text/plain", "Router");
    } else if (nodeName.includes("Switch")) {
      e.dataTransfer!.setData("text/plain", "Switch");
    } else if (nodeName.includes("Host")) {
      e.dataTransfer!.setData("text/plain", "Host");
    }
    console.log(e.dataTransfer!.getData("text/plain"));
  };

  return (
    <>
      <Stack spacing={4}>
        <InputGroup marginBottom="30px">
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.900" />}
          />
          <Input type="tel" placeholder="機器検索" />
        </InputGroup>
      </Stack>

      <VStack spacing="24px">
        <Box
          className="Router"
          onDragStart={onDragStart}
          w="80px"
          h="80px"
          border="1px"
        >
          <Image
            className="RouterImage"
            src="https://i.imgur.com/h0CeoIu.png"
          ></Image>
        </Box>
        <Box
          className="Switch"
          draggable
          onDragStart={onDragStart}
          w="80px"
          h="80px"
          border="1px"
        >
          <Image
            className="SwitchImage"
            src="https://i.imgur.com/VoUNsTC.png"
          ></Image>
        </Box>
        <Box
          className="Host"
          draggable
          onDragStart={onDragStart}
          w="80px"
          h="80px"
          border="1px"
        >
          <Image
            className="HostImage"
            src="https://i.imgur.com/AZYdRRK.png"
          ></Image>
        </Box>
      </VStack>
    </>
  );
}
