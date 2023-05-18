import { L2TP } from "./L2TP";

export class NWInterface {
  /** インタフェースの名前 */
  private _ethName: string;

  /** ケーブルの名前 */
  private _cableName: string;

  /** 論理アドレス */
  private _ipAddress!: string;

  /** サブネットマスク */
  private _netMask!: string;

  /** インタフェースの状態 */
  private _status!: string;

  /** L2TP通信に必要な情報を格納 */
  private _L2TP: L2TP = null;

  /** インタフェース名と存在するケーブルを引き渡すことでインスタンスを生成する*/
  public constructor(name: string, cableName: string) {
    this._ethName = name;
    this._cableName = cableName;
  }

  public get ethName() {
    return this._ethName;
  }

  public setL2TP(
    _sessionID: string,
    _selfTunnelID: string,
    _targetTunnelID: string
  ) {
    this._L2TP = new L2TP(_sessionID, _selfTunnelID, _targetTunnelID);
  }

  public get L2TP() {
    return this._L2TP;
  }
}
