import { AbstractSocket } from "../AbstractSocket";
import { AbstractMessage } from "../message/AbstractMessage";
import { GUIManager } from "@/script/GUIManager";
import { JSONCreator } from "../message/json/JSONCreator";
import { JSONAnalyzer } from "../message/json/JSONAnalyzer";
import { L2TP_INFO } from "../message/concrete/fromServer/L2TP_INFO";

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
      case "L2TP_INFO":
        this.methodOfL2TP_INFO(msg as L2TP_INFO);
        break;
    }
  }

  private methodOfL2TP_INFO(msg: L2TP_INFO) {
    // GUIManager.guimanager
    //   .selectedByUUID(msg.srcUUID)
    //   ?.getInterfaceByEthName(msg.srcEthName)?.setL2TP;

    GUIManager.guimanager
      .selectedByUUID(msg.srcUUID)
      ?.getInterfaceByEthName(msg.srcEthName)
      ?.setL2TP(msg.sessionID, msg.srcTunnelID, msg.dstTunnelID);

    GUIManager.guimanager
      .selectedByUUID(msg.dstUUID)
      ?.getInterfaceByEthName(msg.dstEthName)
      ?.setL2TP(msg.sessionID, msg.dstTunnelID, msg.srcTunnelID);

    console.log(
      "接続元機器: " +
        GUIManager.guimanager.selectedByUUID(msg.srcUUID)?.nodeName +
        "のインタフェース" +
        GUIManager.guimanager
          .selectedByUUID(msg.srcUUID)
          ?.getInterfaceByEthName(msg.srcEthName)?.ethName +
        "のL2TP情報を表示します",
      GUIManager.guimanager
        .selectedByUUID(msg.srcUUID)
        ?.getInterfaceByEthName(msg.srcEthName)?.L2TP
    );

    console.log(
      "接続先機器: " +
        GUIManager.guimanager.selectedByUUID(msg.dstUUID)?.nodeName +
        "のインタフェース" +
        GUIManager.guimanager
          .selectedByUUID(msg.dstUUID)
          ?.getInterfaceByEthName(msg.dstEthName)?.ethName +
        "のL2TP情報を表示します",
      GUIManager.guimanager
        .selectedByUUID(msg.dstUUID)
        ?.getInterfaceByEthName(msg.dstEthName)?.L2TP
    );
  }
}
