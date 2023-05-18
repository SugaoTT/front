import { AbstractMessage } from "../../AbstractMessage";

export class L2TP_INFO extends AbstractMessage {
  private _sessionID!: string;
  private _srcTunnelID!: string;
  private _dstTunnelID!: string;
  private _srcUUID!: string;
  private _srcEthName!: string;
  private _dstUUID!: string;
  private _dstEthName!: string;

  public constructor() {
    super();
    this.messageType = "L2TP_INFO";
  }

  public set sessionID(sessionID: string) {
    this._sessionID = sessionID;
  }

  public get sessionID() {
    return this._sessionID;
  }

  public set srcTunnelID(srcTunnelID: string) {
    this._srcTunnelID = srcTunnelID;
  }

  public get srcTunnelID() {
    return this._srcTunnelID;
  }

  public set dstTunnelID(dstTunnelID: string) {
    this._dstTunnelID = dstTunnelID;
  }

  public get dstTunnelID() {
    return this._dstTunnelID;
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
