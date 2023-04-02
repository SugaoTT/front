import { useContext, useEffect, useRef } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";
import "xterm/lib/xterm.js";
import { FitAddon } from "xterm-addon-fit";
import { AttachAddon } from "xterm-addon-attach";
import { Box } from "@chakra-ui/react";
import { StateContext } from "../context/StateContext";
import { GUIManager } from "@/script/GUIManager";

const { operatingNode, changeOperatingNode, sentMessage, msg } =
  useContext(StateContext);

export class TerminalWindowCL {
  private el = useRef(null);

  private term!: Terminal;
  private fitAddon!: FitAddon;
  private prompt: string = operatingNode + "> ";
  private buffer: string = "";

  private ESCAPE = "\x1b[";

  // Cursor code
  private ERASE_FROM_CURSOR_THROUGH_END = this.ESCAPE + "0K";
  private ERASE_FROM_BEGINNING_THROUGH_CURSOR = this.ESCAPE + "1K";
  private ERASE_LINE = this.ESCAPE + "2K";

  private CURSOR_FORWARD = this.ESCAPE + "C";
  private CURSOR_BACK = this.ESCAPE + "D";

  private cursorBack = (n: number): string => {
    let s = "";
    for (let i = 0; i < n; i++) {
      s += this.CURSOR_BACK;
    }
    return s;
  };

  public writePrompt = () => {
    this.term.writeln("");
    this.term.write(this.prompt);
  };

  public write = (s: string) => {
    this.term.write(s);
  };

  public writeln = (s: string) => {
    this.term.writeln(s);
  };

  public insert = (s: string) => {
    // @ts-ignore
    const cursorX: number = term._core.buffer.x;

    const lengthFromCursor = prompt.length + this.buffer.length - cursorX;
    this.write(this.ERASE_FROM_CURSOR_THROUGH_END);
    this.write(s + this.buffer.slice(cursorX - prompt.length));
    this.write(this.cursorBack(lengthFromCursor));
    this.buffer =
      this.buffer.slice(0, cursorX - prompt.length) +
      s +
      this.buffer.slice(cursorX - prompt.length);
  };

  public commandHandler = (command: string) => {
    //コマンド発行先機器を指定
    let targetUUID = GUIManager.guimanager.getUUIDByNodeName(operatingNode);

    //入力コマンドをもとに送信コマンドを作成
    let jsonData = {
      "message-type": "console",
      "target-uuid": targetUUID,
      "target-node-name": operatingNode,
      content: this.buffer,
    };
    console.log(jsonData);
    GUIManager.guimanager.socket?.send(JSON.stringify(jsonData));
  };

  constructor() {
    this.term = new Terminal({
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

    this.fitAddon = new FitAddon();
    this.term.loadAddon(this.fitAddon);
    this.term.open(this.el.current!);
    this.term.writeln("Welcome to the terminal by xterm.js");
    this.writePrompt();
    this.term.clear();
    this.fitAddon.fit();

    //GUIManager.guimanager.terminal = this.term;

    var curr_line = "";
    var printable: boolean = false;
    this.term.onKey((e: { key: string; domEvent: KeyboardEvent }) => {
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
          const lengthFromCursor = prompt.length + this.buffer.length - cursorX; // カーソルから右端の間の長さ
          const beforeCursorX = cursorX; // 文字削除前のカーソル位置
          this.write(this.cursorBack(1)); // カーソルを戻す
          this.write(this.ERASE_FROM_CURSOR_THROUGH_END); // カーソルから右端まで消す．
          console.log("buffer", this.buffer);
          this.write(this.buffer.slice(beforeCursorX - prompt.length)); // 文字列を戻す
          this.write(this.cursorBack(lengthFromCursor)); // カーソルが右端になるので，カーソル位置戻す
          this.buffer =
            this.buffer.slice(0, beforeCursorX - prompt.length - 1) +
            this.buffer.slice(beforeCursorX - prompt.length);
        }
      } else if (printable) {
        //console.log(curr_line, e.domEvent.key);
        console.log("printable");
        switch (e.domEvent.key) {
          case "Enter":
            if (this.buffer !== "") {
              this.commandHandler(this.buffer);
              this.writePrompt();
              this.buffer = "";
            } else {
              this.writePrompt();
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
              this.write(e.key);
            }
            break;
          case "ArrowRight":
            if (cursorX < prompt.length + this.buffer.length) {
              this.write(e.key);
            }
            break;
          case "ArrowUp":
            // TODO
            break;
          default: // print key
            if (cursorX >= prompt.length + this.buffer.length) {
              this.write(e.key);
              this.buffer += e.key;
            } else {
              this.insert(e.key);
            }
            break;
        }
      }
    });
  }

  render() {
    return <Box ref={this.el}></Box>;
  }
}
