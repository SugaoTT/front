import {
  Input,
  Stack,
  VStack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Box,
  Container,
  Button,
  Text,
} from "@chakra-ui/react";
import { SearchIcon, CheckIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";
import TerminalWindow from "./TerminalWindow";
import dynamic from "next/dynamic";
import IPSetting from "./IPSetting";
import Memo from "./Memo";
import { StateContext } from "../context/StateContext";

const TerminalComponent = dynamic(() => import("./TerminalWindow"), {
  ssr: false,
});

export default function RightBar() {
  const { operatingNode, changeOperatingNode } = useContext(StateContext);

  //let isConsoleVisiable: boolean=true

  const [isConsoleVisiable, setConsoleVisiable] = useState(false);
  const [isIPSettingVisiable, setIPSettingVisiable] = useState(false);
  const [isMemoVisiable, setMemoVisiable] = useState(false);
  const [nodeName, setNodeName] = useState("");

  const changeConsoleVisiable = () => {
    setConsoleVisiable(!isConsoleVisiable);
  };

  const changeIPSettingVisiable = () => {
    setIPSettingVisiable(!isIPSettingVisiable);
  };

  const changeMemoVisiable = () => {
    setMemoVisiable(!isMemoVisiable);
  };

  const changeNodeName = (nodeName: string) => {
    setNodeName(nodeName);
  };

  useEffect(() => {
    setConsoleVisiable(false);
    setIPSettingVisiable(false);
    setMemoVisiable(false);
  }, [operatingNode]);

  return (
    <>
      <VStack>
        <Box w="100%">
          <Text fontSize="3xl">機器名: {operatingNode}</Text>

          <Button
            border="1px"
            color="black"
            onClick={() => changeConsoleVisiable()}
          >
            {isConsoleVisiable && <Box> - Console</Box>}
            {!isConsoleVisiable && <Box> + Console</Box>}
          </Button>
        </Box>
        <Box w="100%">
          {isConsoleVisiable && <TerminalComponent></TerminalComponent>}
        </Box>

        <Box w="100%">
          <Button
            border="1px"
            color="black"
            onClick={() => changeIPSettingVisiable()}
          >
            {isIPSettingVisiable && <Box> - IPネットワーク設定</Box>}
            {!isIPSettingVisiable && <Box> + IPネットワーク設定</Box>}
          </Button>
        </Box>
        <Box w="100%">{isIPSettingVisiable && <IPSetting></IPSetting>}</Box>

        <Box w="100%">
          <Button
            border="1px"
            color="black"
            onClick={() => changeMemoVisiable()}
          >
            {isMemoVisiable && <Box> - メモ</Box>}
            {!isMemoVisiable && <Box> + メモ</Box>}
          </Button>
        </Box>
        <Box w="100%">{isMemoVisiable && <Memo></Memo>}</Box>
      </VStack>
      <Box mb="10"></Box>
    </>
  );
}
