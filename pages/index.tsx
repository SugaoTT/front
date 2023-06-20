import Head from "next/head";
import Image from "next/image";
import { Inter, Xanh_Mono } from "next/font/google";
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
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import LeftBar from "../components/leftBar/LeftBar";
import { NetworkCanvas } from "../components/mainPanel/networkCanvas/NetworkCanvas";
import RightBar from "@/components/rightBar/RightBar";
import { useEffect, useRef, useState } from "react";
import WebSocketCreater from "@/components/_testCode/websocket";
import { AbstractSocket } from "../script/AbstractSocket";
import { GUIManager } from "../script/GUIManager";
import { AbstractNode } from "@/script/AbstractNode";
import ToolBar from "@/components/toolBar/ToolBar";
import Header from "@/components/Header/Header";
import { createContext, useContext } from "react";
import { StateContext, StateProvider } from "@/components/context/StateContext";

import { CountLabel } from "../components/_testCode/CountLabel";
import { PlusButton } from "../components/_testCode/PlusButton";
import { MinusButton } from "../components/_testCode/MinusButton";
import { DisplayState } from "@/components/mainPanel/networkCanvas/DisplayState";

import { REMOVE_NETWORK_REQUEST } from "../script/message/concrete/toServer/REMOVE_NETWORK_REQUEST";

const inter = Inter({ subsets: ["latin"] });

//const ThemeContext = createContext(null);

export default function Home() {
  /**
   * ソケットに関する部分の実装を全部コンテキストにしよう
   */
  const socketRef = useRef<WebSocket>();
  const [isConnected, setIsConnected] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [sentMessage, setSentMessage] = useState("");

  interface PodItem {
    name: string;
  }

  interface Pod {
    items: PodItem[];
  }

  interface Pods {
    pod: Pod;
  }

  //const { msg, changeMsg, operatingNode } = useContext(StateContext);

  /*
  const {
    socket,
    isConnected,
    formMessage,
    sentMessage,
    changeIsConnected,
    changeFormMessage,
    changeSentMessage,
  } = useContext(StateContext);*/

  //socketRef.current = new WebSocket("ws://localhost:8080/socket");

  //console.log(socketRef.current);

  const sendData = (event: any) => {
    event.preventDefault();
    console.log(event.target[0].value);
    setFormMessage(event.target[0].value);
    GUIManager.guimanager.socket?.send(event.target[0].value);
  };

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

  const testSocket = () => {
    console.log(isConnected);
  };

  function isJsonString(str: string): boolean {
    try {
      JSON.parse(str);
      return true;
    } catch (error) {
      return false;
    }
  }

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();

      // ここにタブが閉じる前に実行したい処理を書きます
      console.log("Reloaded");

      //Nodeを生成するメッセージを作成してHandlerへ送る
      let tmp_msg: REMOVE_NETWORK_REQUEST = new REMOVE_NETWORK_REQUEST();

      const myPod: Pods = {
        pod: {
          items: [],
        },
      };

      let node_list = GUIManager.guimanager.list_nodes;
      for (let i = 0; i < node_list.length; i++) {
        myPod.pod.items.push({
          name: node_list[i].UUID,
        });
      }

      console.log(myPod);
      tmp_msg.networkTopology = JSON.stringify(myPod);
      GUIManager.guimanager.eventHandle(tmp_msg);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // console.log(socket);

    GUIManager.guimanager.addSocket(
      new WebSocket("ws://localhost:8080/socket")
    );
    //console.log(GUIManager.guimanager.socket);

    let socket: WebSocket = GUIManager.guimanager.socket;
    socket.onopen = function () {
      setIsConnected(true);
      console.log("Connected");
    };
    socket.onclose = function () {
      console.log("closed");
      setIsConnected(false);
    };
    socket.onmessage = function (event) {
      if (isJsonString(event.data)) {
        const jsonObject = JSON.parse(event.data);
        // JSONデータを処理するロジックをここに記述します

        GUIManager.guimanager.handler.receiveJSON(event.data);
        //console.log(jsonObject); // パースされたJSONオブジェクト
      }

      console.log(event.data);
      setSentMessage(event.data);

      //let terminal = GUIManager.guimanager.terminal;
      let currentConsole = GUIManager.guimanager.currentConsole;
      if (currentConsole != undefined) {
        //GUIManager.guimanager.terminal.writeln(event.data);
        //GUIManager.guimanager.terminal.write(operatingNode + ">");
        //currentConsole.writeln(event.data);

        let outputs: Array<string> = new Array();
        let arr = event.data.split(/\n/);

        for (const value of arr) {
          console.log(value);

          if (value == "EXEC COMPLETE") {
            currentConsole.writePrompt();
          } else {
            currentConsole.writeln(value);
          }

          // a b cの順で出力される
        }

        //console.log(arr);

        //currentConsole.writeln(event.data.replace(/\s{5,}/g, "\n"));
        //console.log(event.data);
        //currentConsole.term.clear();
        //currentConsole.fitAddon.fit();
        //currentConsole.writePrompt();
      }

      //changeMsg(event.data);
      //console.log(event.data);
      //console.log(msg);
    };

    socketRef.current = socket;
    console.log(socketRef.current);

    // useEffectのクリーンアップ関数でイベントリスナーを削除します
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  //const setNodeNameOnRightBar = (nodeName: string) =>{
  //
  //}
  /*
  useEffect(() => {
    //addSocket();
    //sendMsg();

    socketRef.current = new WebSocket("ws://localhost:8080/socket");
    socketRef.current.onopen = function () {
      setIsConnected(true);
      console.log("Connected");
    };

    socketRef.current.onclose = function () {
      console.log("closed");
      setIsConnected(false);
    };

    // server 側から送られてきたデータを受け取る
    socketRef.current.onmessage = function (event) {
      setSentMessage(event.data);
    };

    return () => {
      if (socketRef.current == null) {
        return;
      }
      socketRef.current.close();
    };
  }, []);

  */
  const testMsg = () => {
    console.log(msg);
  };

  return (
    <StateProvider>
      <Head>
        <title>TEST</title>
      </Head>

      {/*
      <Parent />
  

      <button onClick={testMsg}>MSG</button>
      <button onClick={testSocket}>confirm socket</button>
      {/*<button onClick={sendMsg}>SEND</button>
      <h3>sent message: {sentMessage}</h3>

      <h1>WebSocket is connected : {String(isConnected)}</h1>
      <form onSubmit={sendData}>
        <input type="text" name="socketData" />
        <button type="submit">Server に送信</button>
      </form>
      <h3>form message: {formMessage}</h3>
      <h3>sent message: {sentMessage}</h3>*/}

      <Grid
        templateAreas={`"header header header"
                      "tool-bar tool-bar tool-bar"
                       "left-bar main right-bar"`}
        gridTemplateRows={"100px 40px 1fr"}
        gridTemplateColumns={"150px 1fr 550px"}
        h="1080px"
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" bg="gray.100" border="1px" area={"header"}>
          <Header isConnected={isConnected}></Header>
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
          <Box marginLeft="3%" marginTop="2%">
            <NetworkCanvas></NetworkCanvas>
          </Box>
        </GridItem>
      </Grid>
    </StateProvider>
  );
}

/*

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
*/
