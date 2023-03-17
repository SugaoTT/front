export class AbstractMessage {
  /** メッセージの種別 */
  protected _messageType!: string;

  public get messageType() {
    return this._messageType;
  }

  public set messageType(msgType: string) {
    this._messageType = msgType;
  }
}
