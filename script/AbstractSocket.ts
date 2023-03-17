export class AbstractSocket {
  private _socket: WebSocket;
  private static _address: string = "ws://localhost:8080/socket";

  public constructor() {
    this._socket = new WebSocket(AbstractSocket._address);
  }

  public sendData(msg: string) {
    console.log(msg);
    this._socket.send(msg);
  }
}
