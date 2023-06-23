import { AbstractSocket } from "../AbstractSocket";
import { AbstractMessage } from "../message/AbstractMessage";
import { GUIManager } from "@/script/GUIManager";
import { JSONCreator } from "../message/json/JSONCreator";
import { JSONAnalyzer } from "../message/json/JSONAnalyzer";
import { L2TP_INFO } from "../message/concrete/fromServer/L2TP_INFO";
import { LAUNCH_NETWORK_SUCCESS } from "../message/concrete/fromServer/LAUNCH_NETWORK_SUCCESS";
import { useContext } from "react";
import { StateContext } from "@/components/context/StateContext";
//import React from "react";

export class Handler {
  /** サーバとメッセージのやり取りをするためのWebSocket */
  //private _socket: AbstractSocket;

  //useContext使えばモーダル消せそう
  //const connectMode = useContext(StateContext);
  static contextType = StateContext;

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
      case "LAUNCH_NETWORK_SUCCESS":
        this.methodOfLAUNCH_NETWORK_SUCCESS(msg as LAUNCH_NETWORK_SUCCESS);
        break;
    }
  }

  private methodOfLAUNCH_NETWORK_SUCCESS(msg: LAUNCH_NETWORK_SUCCESS) {
    //useContext使えばモーダル消せそう
    // const {
    //   changeConnectMode,
    //   connectMode,
    //   changeConnectStatus,
    //   connectStatus,
    //   changeOperatingNode,
    // } = useContext(StateContext);

    // console.log("clickedNode", connectMode);

    //GUIManagerじゃなくてuseContextで実装しよう
    GUIManager.guimanager.tmpCreatedNodeNum++;

    let isNodeCreateComplete = GUIManager.guimanager.isNodeCreateComplete();

    if (isNodeCreateComplete) {
      console.log(
        "作成するPodの数は" + GUIManager.guimanager.tmpNodeNum + "です．"
      );
      console.log(
        "現在作成が完了したPodの数は" +
          GUIManager.guimanager.tmpCreatedNodeNum +
          "です．"
      );
      //モーダルウィンドウを閉じる
    } else {
      //何もしない
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

    // //useContext使えばモーダル消せそう
    // const {
    //   changeConnectMode,
    //   connectMode,
    //   changeConnectStatus,
    //   connectStatus,
    //   changeOperatingNode,
    // } = useContext(StateContext);

    //const contextValue = this.context;
    //console.log(contextValue);

    // console.log("clickedNode", contextValue.connectMode);
  }
}
