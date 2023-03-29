//import { StateContext } from "@/pages";
import { StateContext } from "@/components/context/StateContext";
import {
  Button,
  VStack,
  Image,
  HStack,
  Box,
  Divider,
  Center,
  createIcon,
  Icon,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useState, useRef, useContext } from "react";
import {
  OpenInNew,
  Save,
  ArrowBack,
  ArrowForward,
  BackSpace,
  ZoomIn,
  ZoomOut,
  Cable,
  RocketLaunch,
} from "./Icons";

export default function ToolBar() {
  const { changeConnectMode, connectMode, changeConnectStatus, connectStatus } =
    useContext(StateContext);

  const open_in_new = () => {
    console.log("clicked open_in_new button!");
  };

  const save = () => {
    console.log("clicked save button!");
  };

  const arrow_back = () => {
    console.log("clicked arrow_back button!");
  };

  const arrow_forward = () => {
    console.log("clicked arrow_forward button!");
  };

  const backspace = () => {
    console.log("clicked backspace button!");
  };

  const zoom_in = () => {
    console.log("clicked zoom_in button!");
  };

  const zoom_out = () => {
    console.log("clicked zoom_out button!");
  };

  const cable = () => {
    console.log("clicked cable button!");
    //接続モードをtrueにする
    changeConnectMode(true);
    //接続ステータスをsrcNode待ち受けにする
    changeConnectStatus("srcNodeを選択");
  };

  const rocket_launch = () => {
    console.log("clicked rocket_launch button!");
  };

  return (
    <HStack spacing="15px">
      <IconButton
        onClick={open_in_new}
        w="35px"
        h="35px"
        aria-label="open in new"
        icon={<OpenInNew w="35px" h="35px" />}
      />

      <IconButton
        onClick={save}
        w="35px"
        h="35px"
        aria-label="save"
        icon={<Save w="35px" h="35px" />}
      />

      <IconButton
        onClick={arrow_back}
        w="35px"
        h="35px"
        aria-label="arrow back"
        icon={<ArrowBack w="35px" h="35px" />}
      />

      <IconButton
        onClick={arrow_forward}
        w="35px"
        h="35px"
        aria-label="arrow forward"
        icon={<ArrowForward w="35px" h="35px" />}
      />

      <IconButton
        onClick={backspace}
        w="35px"
        h="35px"
        aria-label="backspace"
        icon={<BackSpace w="35px" h="35px" />}
      />

      <IconButton
        onClick={zoom_in}
        w="35px"
        h="35px"
        aria-label="zoom in"
        icon={<ZoomIn w="35px" h="35px" />}
      />

      <IconButton
        onClick={zoom_out}
        w="35px"
        h="35px"
        aria-label="zoom out"
        icon={<ZoomOut w="35px" h="35px" />}
      />

      <Center height="25px">
        <Divider borderColor="#000000" orientation="vertical" />
      </Center>

      <IconButton
        onClick={cable}
        w="35px"
        h="35px"
        aria-label="cable"
        icon={<Cable w="35px" h="35px" />}
      />

      {connectMode && <Text fontSize="lg">{connectStatus}</Text>}

      <IconButton
        onClick={rocket_launch}
        w="35px"
        h="35px"
        aria-label="rocket launch"
        icon={<RocketLaunch w="35px" h="35px" />}
      />

      {/*<Text fontSize="lg">{guideMessage}</Text>*/}
    </HStack>
  );
}
