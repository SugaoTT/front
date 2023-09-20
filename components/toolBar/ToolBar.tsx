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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
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
  School,
  FolderOpen,
} from "./Icons";
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
  Portal,
} from "@chakra-ui/react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

import { LAUNCH_NETWORK_REQUEST } from "../../script/message/concrete/toServer/LAUNCH_NETWORK_REQUEST";
import { GUIManager } from "@/script/GUIManager";
import { useEffect } from "react";

export default function ToolBar() {
  const {
    changeConnectMode,
    connectMode,
    changeConnectStatus,
    connectStatus,
    LoadingStatus,
    changeLoadingStatus,
  } = useContext(StateContext);

  let [practiceContent, setContent] = useState("演習を選択して下さい");

  const setPracticeContent = (content: string) => {
    setContent(content);
  };

  let [loadStatus, setStatus] = useState(
    "　　ネットワークトポロジの読み込み中です"
  );

  const setLoadStatus = (status: string) => {
    setStatus(status);
  };

  const [isLoadComplete, setLoadComplete] = useState(false);
  const changeLoadComplete = () => {
    setLoadComplete(!isLoadComplete);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  interface InterfaceItem {
    name: string;
    "target-pod-name": string;
    "target-pod-nic": string;
    "self-tunnel-id": string;
    "target-tunnel-id": string;
    "session-id": string;
  }

  interface Interface {
    items: InterfaceItem[];
  }

  interface Pod {
    "pod-name": string;
    "pod-type": string;
    interface: Interface;
  }

  // Pod をリスト化したインターフェース
  interface Pods {
    podList: Pod[];
  }

  const open_in_new = () => {
    console.log("clicked open_in_new button!");
  };

  const folder_open = () => {
    console.log("clicked folder_open button!");
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
    changeLoadingStatus(false);
  };

  const zoom_out = () => {
    console.log("clicked zoom_out button!");
    changeLoadingStatus(true);
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

    //Nodeを生成するメッセージを作成してHandlerへ送る
    let tmp_msg: LAUNCH_NETWORK_REQUEST = new LAUNCH_NETWORK_REQUEST();

    //ここでネットワークトポロジを作成する
    // let jsonData = {
    //   name: "r1",
    //   nic1: "eth0",
    //   nic2: "eth1",
    // };

    let node_list = GUIManager.guimanager.list_nodes;
    console.log("rocket_launch: ノードリストの表示", node_list);

    //生成するPodの個数を格納
    GUIManager.guimanager.tmpNodeNum = node_list.length;
    console.log(GUIManager.guimanager.tmpNodeNum);

    // 空のPodsの初期化
    const myPods: Pods = {
      podList: [],
    };

    //let tmpMyPod: Pod;

    for (let i = 0; i < node_list.length; i++) {
      console.log(`この配列の${i + 1}番目は${node_list[i].nodeName}です`);

      const myPod: Pod = {
        "pod-name": node_list[i].UUID,
        "pod-type": node_list[i].nodeType,
        interface: {
          items: [],
        },
      };

      for (let j = 0; j < node_list[i].ethList.length; j++) {
        myPod.interface.items.push({
          name: node_list[i].ethList[j].ethName,
          "target-pod-name": node_list[i].ethList[j].targetPodName,
          "target-pod-nic": node_list[i].ethList[j].targetPodEth,
          "self-tunnel-id": node_list[i].ethList[j].L2TP.selfTunnelID,
          "target-tunnel-id": node_list[i].ethList[j].L2TP.remoteTunnelID,
          "session-id": node_list[i].ethList[j].L2TP.sessionID,
        });
      }

      // 完成したPodをPodsのリストに追加
      myPods.podList.push(myPod);
    }
    console.log(myPods);
    tmp_msg.networkTopology = JSON.stringify(myPods);

    console.log("サーバに送信するJSON: ", tmp_msg);
    GUIManager.guimanager.eventHandle(tmp_msg);

    //tmp_msg.networkTopology = JSON.stringify(jsonData);

    //GUIManager.guimanager.eventHandle(tmp_msg);
    //GUIManager.guimanager.socket?.send(JSON.stringify(tmp_msg));

    //読み込み中のモーダルウィンドウが表示される
    console.log("ToolBar: LoadingStatus: ", LoadingStatus);
    if (LoadingStatus == "NOT LOADING") {
      changeLoadingStatus("LOADING");
    }

    // setTimeout(function () {
    //   changeLoadingStatus(false);
    // }, 5000);

    // 5秒待機する
    //@TODO: ここは秒数で指定するのではなく，起動しているかどうかをメッセージで管理すべき
    // setTimeout(function () {
    //   setLoadStatus("　　読み込みが完了しました");
    // }, 5000);
    // setTimeout(function () {
    //   changeLoadComplete();
    // }, 5000);

    // setTimeout(onClose, 7000);
  };

  // const setStatus = () => {
  //   setLoadStatus(inputValue);
  //   onClose();
  // };

  const school = () => {
    console.log("clicked school button!");
  };

  const ip = () => {
    console.log("ip");
    let content =
      "ネットワーク機器にIPアドレスを設定して機器間を通信させよう．　　　　　　使用機器: ルータ1台，ホスト2台　　　　　ルータ1 IP Address: 192.168.0.1/24(net1), 192.168.1.1/24(net2)　　　　　　　　　　　　ホスト1 IP Address: 192.168.0.2　　　　　ホスト2 IP Address: 192.168.1.2";
    setPracticeContent(content);
  };

  const staticRoute = () => {
    console.log("static");
  };

  const vlan = () => {
    console.log("vlan");
  };

  useEffect(() => {
    console.log("LoadStatusの状態変化: ", LoadingStatus);
    if (LoadingStatus == "COMPLETE") {
      setLoadStatus("　　読み込みが完了しました");
      setTimeout(function () {
        onClose();
      }, 2000);
    } else if (LoadingStatus == "LOADING") {
      setLoadStatus("　　ネットワークトポロジの読み込み中です");
    }
  }, [LoadingStatus]);

  return (
    <>
      <HStack spacing="15px">
        <IconButton
          onClick={open_in_new}
          w="35px"
          h="35px"
          aria-label="open in new"
          icon={<OpenInNew w="35px" h="35px" />}
        />

        <IconButton
          onClick={folder_open}
          w="35px"
          h="35px"
          aria-label="folder open"
          icon={<FolderOpen w="35px" h="35px" />}
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
          onClick={() => {
            onOpen();
            rocket_launch();
          }}
          w="35px"
          h="35px"
          aria-label="rocket launch"
          icon={<RocketLaunch w="35px" h="35px" />}
        />

        <Popover>
          <PopoverTrigger>
            <IconButton
              onClick={school}
              w="35px"
              h="35px"
              aria-label="school"
              icon={<School w="35px" h="35px" />}
            />
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>演習課題選択</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <VStack>
                  <Button onClick={ip} width="250px" colorScheme="blue">
                    IPアドレス設定演習
                  </Button>
                  <Button onClick={zoom_out} width="250px" colorScheme="blue">
                    静的ルーティング設定演習
                  </Button>
                  <Button onClick={zoom_out} width="250px" colorScheme="blue">
                    VLAN演習
                  </Button>
                </VStack>
              </PopoverBody>
              <PopoverFooter>
                {practiceContent}
                <br></br>
                <br></br>
                <br></br>
                <Button onClick={zoom_out} marginLeft="50%" colorScheme="green">
                  演習の読み込み
                </Button>
              </PopoverFooter>
            </PopoverContent>
          </Portal>
        </Popover>

        {/*<Text fontSize="lg">{guideMessage}</Text>*/}
      </HStack>

      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody>
            {LoadingStatus == "LOADING" && (
              <CircularProgress isIndeterminate color="green.300" />
            )}
            {LoadingStatus == "COMPLETE" && (
              <CircularProgress value={100} color="blue.300" />
            )}
            {loadStatus}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
