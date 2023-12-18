import {
  Input,
  Stack,
  VStack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Box,
  Image,
  Button,
} from "@chakra-ui/react";
import {
  Fade,
  ScaleFade,
  Slide,
  SlideFade,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { SearchIcon, CheckIcon } from "@chakra-ui/icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";

export default function LeftBar() {
  const { isOpen, onToggle } = useDisclosure();

  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

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
    } else if (nodeName.includes("Test")) {
      e.dataTransfer!.setData("text/plain", "Test");
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

        <Button border="1px" onClick={handleToggle}>
          templates
        </Button>
        <Collapse in={show}>
          <Box
            className="Test"
            onDragStart={onDragStart}
            w="80px"
            h="80px"
            border="1px"
          >
            <Image
              className="SwitchImage"
              src="https://i.imgur.com/qtRGmG1.png"
            ></Image>
            <Popover placement="right">
              <PopoverTrigger>
                <Button draggable w="75px" h="50px">
                  R1H2
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>追加されるトポロジ</PopoverHeader>
                <PopoverBody>
                  <Image src="https://i.imgur.com/aubq1sQ.png"></Image>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
        </Collapse>
      </VStack>
    </>
  );
}
