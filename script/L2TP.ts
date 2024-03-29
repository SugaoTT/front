export class L2TP {
  /** セッションID */
  private _sessionID: string;

  /** 自身のトンネルID */
  private _selfTunnelID: string;

  /** 対抗のトンネルID */
  private _remoteTunnelID!: string;

  /** コンストラクタ */
  public constructor(
    _sessionID: string,
    _selfTunnelID: string,
    _remoteTunnelID: string
  ) {
    this._sessionID = _sessionID;
    this._selfTunnelID = _selfTunnelID;
    this._remoteTunnelID = _remoteTunnelID;
  }

  public get sessionID() {
    return this._sessionID;
  }

  public get selfTunnelID() {
    return this._selfTunnelID;
  }
  public get remoteTunnelID() {
    return this._remoteTunnelID;
  }
}
