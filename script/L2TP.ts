export class L2TP {
  /** セッションID */
  private _sessionID: number;

  /** 自身のトンネルID */
  private _selfTunnelID: number;

  /** 対抗のトンネルID */
  private _remoteTunnelID!: number;

  /** コンストラクタ */
  public constructor(
    _sessionID: number,
    _selfTunnelID: number,
    _remoteTunnelID: number
  ) {
    this._sessionID = _sessionID;
    this._selfTunnelID = _selfTunnelID;
    this._remoteTunnelID = _remoteTunnelID;
  }
}
