import { AbstractSocket } from "../AbstractSocket";
import { AbstractMessage } from "../message/AbstractMessage";

export class Handler {
  /** サーバとメッセージのやり取りをするためのWebSocket */
  private _socket: AbstractSocket;

  public handleToServer(msg: AbstractMessage) {
    //メッセージをjson形式に変換

    //メッセージをサーバに送信
    this._socket.sendData();
  }
}
