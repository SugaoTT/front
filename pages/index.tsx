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
import { useEffect, useRef, useState } from "react";
import WebSocketCreater from "@/components/websocket";
import { AbstractSocket } from "../script/AbstractSocket";
import { GUIManager } from "../script/GUIManager";
import { AbstractNode } from "@/script/AbstractNode";
import ToolBar from "@/components/tool-bar";
import Header from "@/components/header";
import { createContext, useContext } from "react";
//import { StateContext, StateProvider } from "@/components/StateContext";

import { CountLabel } from "../components/CountLabel";
import { PlusButton } from "../components/PlusButton";
import { MinusButton } from "../components/MinusButton";

const inter = Inter({ subsets: ["latin"] });

//const ThemeContext = createContext(null);

export default function Home() {
  //const theme = useContext(ThemeContext);

  const [isConnectMode, setConnectMode] = useState<boolean>(false);
  //const isConnectMode = useRef<boolean>(false);

  const changeConnectMode = (connectMode: boolean) => {
    //isConnectMode.current = !isConnectMode.current;
    setConnectMode(connectMode);
  };

  //const connectStatus = useRef<string>("デフォルト");
  const [connectStatus, setConnectStatus] = useState("デフォルト");

  const changeConnectStatus = (status: string) => {
    //connectStatus.current = status;
    setConnectStatus(status);
  };

  //let isConnectMode: boolean = false;

  //const changeConnectMode = () => {
  //  isConnectMode = true;
  //  console.log("呼ばれてます");
  //};

  const addSocket = () => {
    //new AbstractSocket();
    //new AbstractNode("A");
    GUIManager.guimanager.addSocket(new AbstractSocket());
  };
  const sendMsg = () => {
    GUIManager.guimanager.socket.sendData("TANAKA");
  };

  //const setNodeNameOnRightBar = (nodeName: string) =>{
  //
  //}

  return (
    <StateProvider>
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
          <ToolBar
            changeConnectMode={changeConnectMode}
            isConnectMode={isConnectMode}
            changeConnectStatus={changeConnectStatus}
            connectStatus={connectStatus}
          ></ToolBar>
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
    </StateProvider>
  );
}

const StateContext = createContext({
  connectMode: false,
  connectStatus: "",
  changeConnectMode: (connectMode: boolean) => {},
  changeConnectStatus: (connectStatus: string) => {},
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

const StateProvider = ({ children }: Props): JSX.Element => {
  const [connectMode, setConnectMode] = useState(false);
  const [connectStatus, setConnectStatus] = useState("");
  const changeConnectMode = (connectMode: boolean) => {
    setConnectMode(connectMode);
  };
  const changeConnectStatus = (connectStatus: string) => {
    setConnectStatus(connectStatus);
  };
  return (
    <StateContext.Provider
      value={{
        connectMode,
        connectStatus,
        changeConnectMode,
        changeConnectStatus,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export { StateContext, StateProvider };
