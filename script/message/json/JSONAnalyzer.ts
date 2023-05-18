import { AbstractMessage } from "../AbstractMessage";
import { L2TP_INFO } from "../concrete/fromServer/L2TP_INFO";

export class JSONAnalyzer {
  public static analyze(str: string): AbstractMessage {
    console.log(str);
    let jsonObject = JSON.parse(str);
    let type = jsonObject.MessageType;
    let msg: AbstractMessage | null = null; // 初期化

    switch (type) {
      case "L2TP_INFO":
        msg = new L2TP_INFO();
        (msg as L2TP_INFO).sessionID = jsonObject.SessionID;
        (msg as L2TP_INFO).srcTunnelID = jsonObject.SrcTunnelID;
        (msg as L2TP_INFO).dstTunnelID = jsonObject.DstTunnelID;
        (msg as L2TP_INFO).srcUUID = jsonObject.srcUUID;
        (msg as L2TP_INFO).srcEthName = jsonObject.srcEthName;
        (msg as L2TP_INFO).dstUUID = jsonObject.dstUUID;
        (msg as L2TP_INFO).dstEthName = jsonObject.dstEthName;

        console.log("JSONAnlyzer: L2TP_INFO");
        break;
    }
    if (msg) {
      // nullでないことを確認する
      msg.messageType = type as string;
      return msg;
    } else {
      throw new Error("Unsupported message type"); // サポートされていないメッセージタイプの場合は例外をスローするなどのエラーハンドリングを追加することを検討してください
    }
  }
}
