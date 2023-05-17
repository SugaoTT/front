import { AbstractSocket } from "../AbstractSocket";
import { AbstractMessage } from "../message/AbstractMessage";
import { GUIManager } from "@/script/GUIManager";
import { JSONCreator } from "../message/json/JSONCreator";
import { JSONAnalyzer } from "../message/json/JSONAnalyzer";
import { L2TP_SESSION_ID } from "../message/concrete/fromServer/L2TP_SESSION_ID";

export class Handler {
  /** サーバとメッセージのやり取りをするためのWebSocket */
  //private _socket: AbstractSocket;

  public handleToServer(msg: AbstractMessage) {
    //メッセージをjson形式に変換
    let jsonData: string = JSONCreator.create(msg);
    //console.log(jsonData);

    //メッセージをサーバに送信
    //this._socket.sendData();
    //this._socket.sendData.bind(this._socket)("msg");
    GUIManager.guimanager.socket?.send(jsonData);
  }

  public receiveJSON(str: string): void {
    //デバッグ用
    console.log(str.length);
    console.log("receiv: " + str);
    let msg = JSONAnalyzer.analyze(str);

    console.log("receiveJSON", msg);

    switch (msg.messageType) {
      case "L2TP_SESSION_ID":
        this.methodOfL2TP_SESSION_ID(msg as L2TP_SESSION_ID);
        break;
    }
  }

  private methodOfL2TP_SESSION_ID(msg: L2TP_SESSION_ID) {
    // GUIManager.guimanager
    //   .selectedByUUID(msg.srcUUID)
    //   ?.getInterfaceByEthName(msg.srcEthName)?.setL2TP;
  }
}
