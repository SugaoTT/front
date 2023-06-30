import {
  Input,
  Stack,
  VStack,
  HStack,
  Divider,
  Center,
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
import { useContext, useEffect, useState, useRef } from "react";
import { StateContext } from "../context/StateContext";
import { GUIManager } from "@/script/GUIManager";

export default function IPSetting() {
  const { operatingNode, changeOperatingNode } = useContext(StateContext);
  const ipRef = useRef("");
  const prefixRef = useRef("");
  const gwRef = useRef("");

  let [ethName, setName] = useState("未選択");
  const setEthName = (ethName: string) => {
    setName(ethName);
  };

  const node = GUIManager.guimanager.selectedByNodeName(operatingNode);
  //const list = a?.ethList.

  const ethList = node?.ethList;
  let tmpList = [];

  if (ethList) {
    for (let i = 0; i < ethList.length; i++) {
      tmpList.push(ethList[i].ethName);
    }
  }
  const handleItemClick = (item: string) => {
    setEthName(item);
    console.log(item);
  };

  let handleIPChange = (e: any) => {
    ipRef.current = e.target.value;
  };

  let handlePrefixChange = (e: any) => {
    prefixRef.current = e.target.value;
  };

  let handleGWChange = (e: any) => {
    gwRef.current = e.target.value;
  };

  const handleIPSet = () => {
    let command =
      "ip addr add " +
      ipRef.current +
      "/" +
      prefixRef.current +
      " dev " +
      ethName;

    //入力コマンドをもとに送信コマンドを作成
    if (node) {
      let jsonData = {
        MessageType: "console",
        "target-uuid": node.UUID,
        "target-node-name": node.nodeName,
        content: command,
      };
      console.log(jsonData);
      GUIManager.guimanager.socket?.send(JSON.stringify(jsonData));
    }
  };

  const handleIPDel = () => {
    let command =
      "ip addr del " +
      ipRef.current +
      "/" +
      prefixRef.current +
      " dev " +
      ethName;

    //入力コマンドをもとに送信コマンドを作成
    if (node) {
      let jsonData = {
        MessageType: "console",
        "target-uuid": node.UUID,
        "target-node-name": node.nodeName,
        content: command,
      };
      console.log(jsonData);
      GUIManager.guimanager.socket?.send(JSON.stringify(jsonData));
    }
  };

  const handleGWSet = () => {
    let command = "ip route add default via " + gwRef.current;

    //入力コマンドをもとに送信コマンドを作成
    if (node) {
      let jsonData = {
        MessageType: "console",
        "target-uuid": node.UUID,
        "target-node-name": node.nodeName,
        content: command,
      };
      console.log(jsonData);
      GUIManager.guimanager.socket?.send(JSON.stringify(jsonData));
    }
  };

  const handleGWDel = () => {
    let command = "ip route del default via " + gwRef.current;

    //入力コマンドをもとに送信コマンドを作成
    if (node) {
      let jsonData = {
        MessageType: "console",
        "target-uuid": node.UUID,
        "target-node-name": node.nodeName,
        content: command,
      };
      console.log(jsonData);
      GUIManager.guimanager.socket?.send(JSON.stringify(jsonData));
    }
  };

  return (
    <>
      <VStack spacing="24px">
        <Divider borderColor="#000000" orientation="horizontal" />
        <HStack>
          <Menu placement="left">
            <MenuButton
              border="1px"
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              インタフェース名を選択
            </MenuButton>
            <MenuList>
              {tmpList.map(
                (
                  item,
                  index // リストの各要素に対してMenuItemを生成
                ) => (
                  <MenuItem key={index} onClick={() => handleItemClick(item)}>
                    {item}
                  </MenuItem>
                )
              )}
            </MenuList>
          </Menu>
          <Text fontSize="xl">選択インタフェース: {ethName} </Text>
        </HStack>
        <Divider borderColor="#000000" orientation="horizontal" />
        <Text fontSize="xl">IP Address: </Text>
        <HStack>
          <Textarea
            rows={1}
            width="150px"
            border="1px"
            placeholder="IPアドレス"
            onChange={handleIPChange}
          />
          <Text fontSize="xl">/ </Text>
          <Textarea
            rows={1}
            width="150px"
            border="1px"
            placeholder="プリフィクス長"
            onChange={handlePrefixChange}
          />
          <Button colorScheme="teal" size="lg" onClick={handleIPSet}>
            設定
          </Button>
          <Button colorScheme="teal" size="lg" onClick={handleIPDel}>
            削除
          </Button>
        </HStack>

        <Divider borderColor="#000000" orientation="horizontal" />

        <Text fontSize="xl">Default Gateway: </Text>
        <HStack>
          <Textarea
            rows={1}
            width="320px"
            border="1px"
            placeholder="デフォルトゲートウェイ"
            onChange={handleGWChange}
          />
          <Button colorScheme="teal" size="lg" onClick={handleGWSet}>
            設定
          </Button>
          <Button colorScheme="teal" size="lg" onClick={handleGWDel}>
            削除
          </Button>
        </HStack>
        <Divider borderColor="#000000" orientation="horizontal" />
      </VStack>
    </>
  );
}
