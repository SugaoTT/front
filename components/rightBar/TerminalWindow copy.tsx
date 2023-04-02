import { useContext, useEffect, useRef } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";
import "xterm/lib/xterm.js";
import { FitAddon } from "xterm-addon-fit";
import { AttachAddon } from "xterm-addon-attach";
import { Box } from "@chakra-ui/react";
import { StateContext } from "../context/StateContext";
import { GUIManager } from "@/script/GUIManager";
import { Console } from "./Console";

export default function TerminalWindow() {
  const { operatingNode, changeOperatingNode, sentMessage, msg } =
    useContext(StateContext);
  const el = useRef(null);

  let term!: Terminal;
  let fitAddon!: FitAddon;
  let prompt: string = operatingNode + "> ";
  let buffer: string = "";

  const ESCAPE = "\x1b[";

  // Cursor code
  const ERASE_FROM_CURSOR_THROUGH_END = ESCAPE + "0K";
  const ERASE_FROM_BEGINNING_THROUGH_CURSOR = ESCAPE + "1K";
  const ERASE_LINE = ESCAPE + "2K";

  const CURSOR_FORWARD = ESCAPE + "C";
  const CURSOR_BACK = ESCAPE + "D";

  const cursorBack = (n: number): string => {
    let s = "";
    for (let i = 0; i < n; i++) {
      s += CURSOR_BACK;
    }
    return s;
  };

  const writePrompt = () => {
    term.writeln("");
    term.write(prompt);
  };

  const write = (s: string) => {
    term.write(s);
  };

  const writeln = (s: string) => {
    term.writeln(s);
  };

  const insert = (s: string) => {
    // @ts-ignore
    const cursorX: number = term._core.buffer.x;

    const lengthFromCursor = prompt.length + buffer.length - cursorX;
    write(ERASE_FROM_CURSOR_THROUGH_END);
    write(s + buffer.slice(cursorX - prompt.length));
    write(cursorBack(lengthFromCursor));
    buffer =
      buffer.slice(0, cursorX - prompt.length) +
      s +
      buffer.slice(cursorX - prompt.length);
  };

  const commandHandler = (command: string) => {
    //コマンド発行先機器を指定
    let targetUUID = GUIManager.guimanager.getUUIDByNodeName(operatingNode);

    //入力コマンドをもとに送信コマンドを作成
    let jsonData = {
      "message-type": "console",
      "target-uuid": targetUUID,
      "target-node-name": operatingNode,
      content: buffer,
    };
    console.log(jsonData);
    GUIManager.guimanager.socket?.send(JSON.stringify(jsonData));
  };

  useEffect(() => {
    //netConsole.start("console")
    term = new Terminal({
      fontSize: 14,
      rows: 30,
      cursorBlink: true,
      cursorStyle: "bar",
      theme: {
        foreground: "#ffffff", //Font
        background: "#000000", //Background color
        cursor: "#ffffff", //Set cursor
      },
    });

    fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(el.current!);
    term.writeln("Welcome to the terminal by xterm.js");
    writePrompt();
    term.clear();
    fitAddon.fit();

    GUIManager.guimanager.terminal = term;

    var curr_line = "";
    var printable: boolean = false;
    term.onKey((e: { key: string; domEvent: KeyboardEvent }) => {
      //if(e.domEvent.keyCode)
      //curr_line += e.domEvent.key;
      printable =
        !e.domEvent.altKey && !e.domEvent.ctrlKey && !e.domEvent.metaKey;
      curr_line += e.domEvent.key;

      // eslint-disable-next-line
      // @ts-ignore
      const cursorX: number = term._core.buffer.x;
      console.log(cursorX);

      if (e.domEvent.keyCode === 8) {
        if (cursorX > prompt.length) {
          const lengthFromCursor = prompt.length + buffer.length - cursorX; // カーソルから右端の間の長さ
          const beforeCursorX = cursorX; // 文字削除前のカーソル位置
          write(cursorBack(1)); // カーソルを戻す
          write(ERASE_FROM_CURSOR_THROUGH_END); // カーソルから右端まで消す．
          console.log("buffer", buffer);
          write(buffer.slice(beforeCursorX - prompt.length)); // 文字列を戻す
          write(cursorBack(lengthFromCursor)); // カーソルが右端になるので，カーソル位置戻す
          buffer =
            buffer.slice(0, beforeCursorX - prompt.length - 1) +
            buffer.slice(beforeCursorX - prompt.length);
        }
      } else if (printable) {
        //console.log(curr_line, e.domEvent.key);
        console.log("printable");
        switch (e.domEvent.key) {
          case "Enter":
            if (buffer !== "") {
              commandHandler(buffer);
              writePrompt();
              buffer = "";
            } else {
              writePrompt();
            }

            break;
          case "Tab":
            // TODO
            break;
          case "ArrowDown":
            // TODO
            break;
          case "ArrowLeft":
            if (cursorX > prompt.length) {
              write(e.key);
            }
            break;
          case "ArrowRight":
            if (cursorX < prompt.length + buffer.length) {
              write(e.key);
            }
            break;
          case "ArrowUp":
            // TODO
            break;
          default: // print key
            if (cursorX >= prompt.length + buffer.length) {
              write(e.key);
              buffer += e.key;
            } else {
              insert(e.key);
            }
            break;
        }
      }
    });

    return () => {
      fitAddon.dispose();
      term.dispose();
    };
  }, []);

  useEffect(() => {
    console.log("a");
    term.write(sentMessage);
  }, [msg]);

  return <Box ref={el}></Box>;
}
