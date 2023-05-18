import { AbstractMessage } from "../../AbstractMessage";

export class L2TP_INFO_REQUEST extends AbstractMessage {
  private _srcUUID!: string;
  private _srcEthName!: string;
  private _dstUUID!: string;
  private _dstEthName!: string;

  public constructor() {
    super();
    this.messageType = "L2TP_INFO_REQUEST";
  }

  public set srcUUID(srcUUID: string) {
    this._srcUUID = srcUUID;
  }

  public get srcUUID() {
    return this._srcUUID;
  }

  public set srcEthName(srcEthName: string) {
    this._srcEthName = srcEthName;
  }

  public get srcEthName() {
    return this._srcEthName;
  }

  public set dstUUID(dstUUID: string) {
    this._dstUUID = dstUUID;
  }

  public get dstUUID() {
    return this._dstUUID;
  }

  public set dstEthName(dstEthName: string) {
    this._dstEthName = dstEthName;
  }

  public get dstEthName() {
    return this._dstEthName;
  }
}
