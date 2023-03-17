import { v4 as uuidv4 } from "uuid";
import { GUIManager } from "@/script/GUIManager";

/** 各種ノードのおおもとのクラス、コンテナを継承している */
export class AbstractNode {
  /** ノードのIDを格納，サーバ内で一意となる */
  private _UUID!: string;

  /** ノード名を格納，クライアント内で一意となる．ネットワークキャンバス等に書く際はこちらを使用 */
  private _nodeName!: string;

  /** ノードタイプ */
  private _nodeType!: string;

  /** コンソールログを格納 */
  private _consoleLog!: string;

  public constructor(nodeType: string) {
    this._nodeType = nodeType; //TODO enumとか使ったほうがいい
    this.makeUUID();
    this.makeNodeName(nodeType);
  }

  public makeUUID() {
    this._UUID = uuidv4();
  }

  public makeNodeName(nodeType: string) {
    let name = "";
    if (nodeType == "Router") {
      name = nodeType + GUIManager.guimanager.list_routers.length;
    } else if (nodeType == "Switch") {
      name = nodeType + GUIManager.guimanager.list_switches.length;
    } else if (nodeType == "Host") {
      name = nodeType + GUIManager.guimanager.list_hosts.length;
    }
    this._nodeName = name;
  }

  public set UUID(UUID: string) {
    this._UUID = UUID;
  }

  public get UUID(): string {
    return this._UUID;
  }

  public set nodeName(nodeName: string) {
    this._nodeName = nodeName;
  }

  public get nodeName(): string {
    return this._nodeName;
  }

  public set nodeType(nodeType: string) {
    this._nodeType = nodeType;
  }

  public get nodeType(): string {
    return this._nodeType;
  }
}
