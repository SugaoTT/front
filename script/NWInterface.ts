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

  /** インタフェース名と存在するケーブルを引き渡すことでインスタンスを生成する*/
  public constructor(name: string, cableName: string) {
    this._ethName = name;
    this._cableName = cableName;
  }
}
