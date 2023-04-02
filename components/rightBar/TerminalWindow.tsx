import { useContext, useEffect, useRef } from "react";
import "xterm/css/xterm.css";
import "xterm/lib/xterm.js";
import { Box } from "@chakra-ui/react";
import { StateContext } from "../context/StateContext";
import { Console } from "./Console";

export default function TerminalWindow() {
  //コンテキストの利用
  const { operatingNode } = useContext(StateContext);
  //Console用のHTML Element
  const el = useRef(null);

  //コンソール
  let terminal: Console;

  //コンソールコンポーネントのマウント
  useEffect(() => {
    //インスタンスの作成
    terminal = new Console(operatingNode, el);

    //片付け処理の実施
    return () => {
      if (terminal != undefined) {
        terminal.closeTerminal();
      }
    };
  }, []);

  return <Box ref={el}></Box>;
}
