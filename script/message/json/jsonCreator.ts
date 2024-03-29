import { AbstractMessage } from "../AbstractMessage";
import { LAUNCH_NETWORK_REQUEST } from "../concrete/toServer/LAUNCH_NETWORK_REQUEST";
import { REMOVE_NETWORK_REQUEST } from "../concrete/toServer/REMOVE_NETWORK_REQUEST";
import { L2TP_INFO_REQUEST } from "../concrete/toServer/L2TP_INFO_REQUEST";
import { L2TP_TUNNEL_ID_REQUEST } from "../concrete/toServer/L2TP_TUNNEL_ID_REQUEST";

export class JSONCreator {
  public static create(msg: AbstractMessage): string {
    let type: string = msg.messageType;
    let tmpJSON;
    let jsonData: string = "";

    switch (type) {
      case "LAUNCH_NETWORK_REQUEST":
        let launchNetwork_msg: LAUNCH_NETWORK_REQUEST =
          msg as LAUNCH_NETWORK_REQUEST;
        //入力コマンドをもとに送信コマンドを作成
        tmpJSON = {
          messageType: type,
          networkTopology: launchNetwork_msg.networkTopology,
        };
        console.log(tmpJSON);
        jsonData = JSON.stringify(tmpJSON);
        console.log(jsonData);
        break;
      case "L2TP_INFO_REQUEST":
        let L2TP_SESSION_ID_REQUEST_msg: L2TP_INFO_REQUEST =
          msg as L2TP_INFO_REQUEST;
        tmpJSON = {
          messageType: type,
          srcUUID: L2TP_SESSION_ID_REQUEST_msg.srcUUID,
          srcEthName: L2TP_SESSION_ID_REQUEST_msg.srcEthName,
          dstUUID: L2TP_SESSION_ID_REQUEST_msg.dstUUID,
          dstEthName: L2TP_SESSION_ID_REQUEST_msg.dstEthName,
        };
        jsonData = JSON.stringify(tmpJSON);
        console.log("L2TP_INFO_REQUEST", jsonData);
        break;
      case "L2TP_TUNNEL_ID_REQUEST":
        let L2TP_TUNNEL_ID_REQUEST: L2TP_TUNNEL_ID_REQUEST =
          msg as L2TP_TUNNEL_ID_REQUEST;
        tmpJSON = {
          "message-type": type,
        };
        jsonData = JSON.stringify(tmpJSON);
        break;

      case "REMOVE_NETWORK_REQUEST":
        let removeNetwork_msg: REMOVE_NETWORK_REQUEST =
          msg as REMOVE_NETWORK_REQUEST;
        //入力コマンドをもとに送信コマンドを作成
        tmpJSON = {
          messageType: type,
          networkTopology: removeNetwork_msg.networkTopology,
        };
        console.log(tmpJSON);
        jsonData = JSON.stringify(tmpJSON);
        console.log(jsonData);
        break;
    }
    return jsonData;
  }
}
