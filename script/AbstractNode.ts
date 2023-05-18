import { v4 as uuidv4 } from "uuid";
import { GUIManager } from "@/script/GUIManager";
import { NWInterface } from "./NWInterface";

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

  /** メモの内容を格納 */
  private _memoContent!: string;

  /** インタフェースリストを格納するコレクション */
  protected _list_eth: Array<NWInterface> = new Array();

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

  public get ethList() {
    return this._list_eth;
  }

  public addInterface(cableName: string): string {
    let ethName = this.getNextEthName();
    this._list_eth.push(new NWInterface(ethName, cableName));
    return ethName;
  }

  public getInterfaceByEthName(ethName: string): NWInterface | null {
    let eth: NWInterface;
    for (let i: number = 0; i < this._list_eth.length; i++) {
      eth = this._list_eth[i];
      if (ethName == eth.ethName) {
        return eth;
      }
    }
    return null;
  }

  /** インタフェースを取得する
   * 存在しなければnullを返す */
  /*public getEthinterface(name: string): NWInterface | null {
    for (var i: number = 0; i < this._list_eth.length; i++) {
      if ((this._list_eth[i] as NWInterface).ethName == name) {
        return this._list_eth[i] as NWInterface;
      }
    }
    return null;
  }*/

  /** 次の numbererfaceの名前を返す */
  public getNextEthName(): string {
    let interfaceNum = this._list_eth.length + 1;
    return "net" + interfaceNum;
  }
}
