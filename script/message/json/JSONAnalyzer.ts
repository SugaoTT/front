import { AbstractMessage } from "../AbstractMessage";
import { L2TP_SESSION_ID } from "../concrete/fromServer/L2TP_SESSION_ID";

export class JSONAnalyzer {
  public static analyze(str: string): AbstractMessage {
    console.log(str);
    let jsonObject = JSON.parse(str);
    let type = jsonObject.MessageType;
    let msg: AbstractMessage | null = null; // 初期化

    switch (type) {
      case "L2TP_SESSION_ID":
        msg = new L2TP_SESSION_ID();
        (msg as L2TP_SESSION_ID).srcUUID = jsonObject.srcUUID;
        (msg as L2TP_SESSION_ID).srcEthName = jsonObject.srcEthName;
        (msg as L2TP_SESSION_ID).dstUUID = jsonObject.dstUUID;
        (msg as L2TP_SESSION_ID).dstEthName = jsonObject.dstEthName;

        console.log("JSONAnlyzer: L2TP_SESSION_ID");
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
