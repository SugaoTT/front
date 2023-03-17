import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import {
  Grid,
  GridItem,
  chakra,
  Box,
  Center,
  Show,
  Hide,
  Container,
} from "@chakra-ui/react";
import LeftBar from "../components/left-bar";
import { NetworkCanvas } from "../components/network-canvas";
import RightBar from "@/components/right-bar";
import { useEffect, useState } from "react";
import WebSocketCreater from "@/components/websocket";
import { AbstractSocket } from "../script/AbstractSocket";
import { GUIManager } from "../script/GUIManager";
import { AbstractNode } from "@/script/AbstractNode";
import ToolBar from "@/components/tool-bar";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

function Parent() {
  const [show, setShow] = useState<boolean>(false);

  console.log("Parent");

  return (
    <div>
      <button onClick={() => setShow((prev) => !prev)}>toggle</button>
      <br />
      {show && <Child />}
    </div>
  );
}

function Child() {
  console.log("Child");

  const [state, setState] = useState<number>(0);

  useEffect(() => {
    console.log("Child mounted!");
    return () => {
      console.log("Child unmounted!");
    };
  }, []);

  return (
    <div>
      <button onClick={() => setState(Math.random())}>再レンダリング</button>
      {state}
      <br />
    </div>
  );
}
export default function Home() {
  const addSocket = () => {
    //new AbstractSocket();
    //new AbstractNode("A");
    GUIManager.guimanager.addSocket(new AbstractSocket());
  };
  const sendMsg = () => {
    GUIManager.guimanager.socket.sendData("TANAKA");
  };

  return (
    <>
      <Head>
        <title>TEST</title>
      </Head>

      {/*
      <Parent />
  */}

      {/*<button onClick={addSocket}>BUTTON</button>
      <button onClick={sendMsg}>SEND</button>*/}

      <Grid
        templateAreas={`"header header header"
                      "tool-bar tool-bar tool-bar"
                       "left-bar main right-bar"`}
        gridTemplateRows={"100px 40px 1fr"}
        gridTemplateColumns={"150px 1fr 350px"}
        h="1080px"
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" bg="gray.100" border="1px" area={"header"}>
          <Header></Header>
        </GridItem>
        <GridItem pl="2" bg="gray.100" border="1px" area={"tool-bar"}>
          <ToolBar></ToolBar>
        </GridItem>
        <GridItem pl="2" bg="gray.100" border="1px" area={"left-bar"}>
          <Box marginTop="5%">
            <LeftBar></LeftBar>
          </Box>
        </GridItem>
        <GridItem pl="2" bg="gray.100" border="1px" area={"right-bar"}>
          <Box marginTop="5%">
            <RightBar></RightBar>
          </Box>
        </GridItem>
        <GridItem overflow="scroll" pl="2" area={"main"}>
          <Box marginLeft="12%" marginTop="2%">
            <NetworkCanvas></NetworkCanvas>
          </Box>
        </GridItem>
      </Grid>
    </>
  );
}
