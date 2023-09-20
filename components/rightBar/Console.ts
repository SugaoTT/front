import { Terminal } from "xterm";
import "xterm/css/xterm.css";
import "xterm/lib/xterm.js";
import { FitAddon } from "xterm-addon-fit";
import { GUIManager } from "@/script/GUIManager";

export class Console {
  //現在操作中のノード名
  public operatingNode = "";
  //xtermの部品達
  public term!: Terminal;
  public fitAddon!: FitAddon;

  //プロンプトの宣言 //@TODO privateに
  public prompt: string;
  //一時的に出力コマンドを貯めるバッファ
  private buffer: string = "";

  private history: string[];
  private historyIndex: number;

  //ESCAPEキーを示すKeyCode
  private ESCAPE = "\x1b[";

  //Cursor code
  private ERASE_FROM_CURSOR_THROUGH_END = this.ESCAPE + "0K";
  private ERASE_FROM_BEGINNING_THROUGH_CURSOR = this.ESCAPE + "1K";
  private ERASE_LINE = this.ESCAPE + "2K";
  private CURSOR_FORWARD = this.ESCAPE + "C";
  private CURSOR_BACK = this.ESCAPE + "D";

  //カーソルを戻す処理を実施する関数
  private cursorBack = (n: number): string => {
    let s = "";
    for (let i = 0; i < n; i++) {
      s += this.CURSOR_BACK;
    }
    return s;
  };

  //ターミナルを閉じるときの片付け処理
  public closeTerminal = () => {
    this.fitAddon.dispose();
    this.term.dispose();
  };

  //プロンプトを出力
  public writePrompt = () => {
    this.term.writeln("");
    this.term.write(this.prompt);
  };

  //ターミナルへ文字列を出力(改行なし)
  public write = (s: string) => {
    this.term.write(s);
  };

  //ターミナルへ文字列を出力(改行あり)
  public writeln = (s: string) => {
    this.term.writeln(s);
  };

  //文字を挿入する処理を実施する関数
  public insert = (s: string) => {
    // @ts-ignore
    const cursorX: number = this.term._core.buffer.x;

    const lengthFromCursor = this.prompt.length + this.buffer.length - cursorX;
    this.write(this.ERASE_FROM_CURSOR_THROUGH_END);
    this.write(s + this.buffer.slice(cursorX - this.prompt.length));
    this.write(this.cursorBack(lengthFromCursor));
    this.buffer =
      this.buffer.slice(0, cursorX - this.prompt.length) +
      s +
      this.buffer.slice(cursorX - this.prompt.length);
  };

  //入力コマンドをパースしてサーバへ出力する関数
  public commandHandler = (command: string) => {
    //コマンド発行先機器を指定
    let targetUUID = GUIManager.guimanager.getUUIDByNodeName(
      this.operatingNode
    );

    //入力コマンドをもとに送信コマンドを作成
    let jsonData = {
      MessageType: "console",
      "target-uuid": targetUUID,
      "target-node-name": this.operatingNode,
      content: this.buffer,
    };
    console.log(jsonData);
    GUIManager.guimanager.socket?.send(JSON.stringify(jsonData));
  };

  //ログを保存
  public saveConsoleLog = (hasPrompt: bool, command: string) => {
    //コンソールログに保存
    if (this.operatingNode) {
      if (hasPrompt) {
        GUIManager.guimanager
          .selectedByNodeName(this.operatingNode)
          .consoleLog.push(this.prompt + command);
      } else {
        GUIManager.guimanager
          .selectedByNodeName(this.operatingNode)
          .consoleLog.push(command);
      }
    }
  };

  //コンストラクタの定義
  constructor(operatingNode: string, el: any) {
    //現在操作中ノード名の設定
    this.operatingNode = operatingNode;
    //プロンプト名の設定
    this.prompt = operatingNode + "> ";

    //historyの設定
    this.history = [];
    this.historyIndex = 0;

    //xtermを生成
    this.term = new Terminal({
      fontSize: 12,
      rows: 30,
      cursorBlink: true,
      cursorStyle: "bar",
      theme: {
        foreground: "#ffffff", //Font
        background: "#000000", //Background color
        cursor: "#ffffff", //Set cursor
      },
    });

    //xtermに関連したアドオンの設定
    this.fitAddon = new FitAddon();
    this.term.loadAddon(this.fitAddon);
    this.term.open(el.current!);
    //初期画面の出力される文字列の設定
    this.term.writeln("Welcome to the terminal by xterm.js");
    //this.writePrompt();
    this.term.clear();
    this.fitAddon.fit();

    //GUIマネージャに現在操作中コンソールの登録
    GUIManager.guimanager.currentConsole = this;

    //コンソールログを取得して出力

    if (operatingNode) {
      let consoleList =
        GUIManager.guimanager.selectedByNodeName(operatingNode).consoleLog;
      console.log(consoleList);
      for (const item of consoleList) {
        this.term.writeln(item);
      }
    }

    //プロンプトを出力
    this.writePrompt();
    //入力コマンドに対してパースする条件を定義
    var printable: boolean = false;

    //var termRef = this.term;
    // var bufferRef = this.buffer;
    // キーボードイベントのリスナを設定します
    // el.current!.addEventListener("keydown", async function (event) {
    //   // Ctrl+V (Windows/Linux) または Cmd+V (Mac) が押されたかをチェックします
    //   if ((event.ctrlKey || event.metaKey) && event.key === "v") {
    //     // ブラウザのクリップボードAPIを使用してテキストを取得します
    //     const text = await navigator.clipboard.readText();
    //     // ペーストしたテキストを xterm に書き込みます
    //     //bufferRef = text;
    //     termRef.write(text);
    //   }
    // });

    el.current!.addEventListener("keydown", async (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "v") {
        const text = await navigator.clipboard.readText();
        this.buffer += text;
        this.term.write(text);
      }
    });

    //入力キーに対応する処理の定義
    this.term.onKey((e: { key: string; domEvent: KeyboardEvent }) => {
      printable =
        !e.domEvent.altKey && !e.domEvent.ctrlKey && !e.domEvent.metaKey;

      // カーソルの位置を記録
      // eslint-disable-next-line
      // @ts-ignore
      const cursorX: number = this.term._core.buffer.x;

      //BackSpaceキーが押下されたとき
      if (e.domEvent.keyCode === 8) {
        if (cursorX > this.prompt.length) {
          const lengthFromCursor =
            this.prompt.length + this.buffer.length - cursorX; // カーソルから右端の間の長さ
          const beforeCursorX = cursorX; // 文字削除前のカーソル位置
          this.write(this.cursorBack(1)); // カーソルを戻す
          this.write(this.ERASE_FROM_CURSOR_THROUGH_END); // カーソルから右端まで消す．
          this.write(this.buffer.slice(beforeCursorX - this.prompt.length)); // 文字列を戻す
          this.write(this.cursorBack(lengthFromCursor)); // カーソルが右端になるので，カーソル位置戻す
          this.buffer =
            this.buffer.slice(0, beforeCursorX - this.prompt.length - 1) +
            this.buffer.slice(beforeCursorX - this.prompt.length);
        }
      } else if (printable) {
        switch (e.domEvent.key) {
          case "Enter": //Enterキーが押下されたときの処理
            //console.log("バッファーの中身", this.buffer);
            if (this.buffer !== "") {
              this.commandHandler(this.buffer);
              this.history.push(this.buffer);
              this.historyIndex = this.history.length;

              //コンソールログに保存
              this.saveConsoleLog(true, this.buffer);

              console.log("history", this.history);
              console.log("historyIndex", this.historyIndex);

              this.writeln("");
              this.buffer = "";
            } else {
              //コンソールログに保存
              this.saveConsoleLog(true, "");
              this.writePrompt();
            }
            break;
          case "Tab": //Tabキーが押下されたときの処理
            // TODO
            break;
          case "ArrowDown": //矢印キーの下が入力されたとき
            // TODO: 入力コマンドに対する履歴を出力したい

            if (this.historyIndex < this.history.length - 1) {
              this.historyIndex++;

              console.log("history", this.history);
              console.log("historyIndex", this.historyIndex);
              this.buffer = this.history[this.historyIndex];
              this.write(
                "\x1b[2K\r" + this.prompt + this.history[this.historyIndex]
              );
            } else if (this.historyIndex == this.history.length - 1) {
              this.buffer = "";
              this.write("\x1b[2K\r" + this.prompt);
            }

            break;
          case "ArrowLeft": //矢印キーの左が入力されたとき
            if (cursorX > this.prompt.length) {
              this.write(e.key);
            }
            break;
          case "ArrowRight": //矢印キーの右が入力されたとき
            if (cursorX < this.prompt.length + this.buffer.length) {
              this.write(e.key);
            }
            break;
          case "ArrowUp": //矢印キーの上が入力されたとき
            // TODO: 入力コマンドに対する履歴を出力したい
            // console.log("history", this.history);
            // console.log("historyIndex", this.historyIndex);
            if (this.historyIndex > 0) {
              this.historyIndex--;
            }
            console.log("history", this.history);
            console.log("historyIndex", this.historyIndex);
            this.buffer = this.history[this.historyIndex];
            this.write(
              "\x1b[2K\r" + this.prompt + this.history[this.historyIndex]
            );
            break;
          // case "?":
          //   console.log("?");
          //   break;
          default: //標準文字キーが入力されたとき
            if (cursorX >= this.prompt.length + this.buffer.length) {
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
}
