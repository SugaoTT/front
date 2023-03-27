import { AbstractNode } from "./AbstractNode";
import { AbstractSocket } from "./AbstractSocket";

export class GUIManager {
  /** 自身を格納する変数*/
  private static _guimanager: GUIManager;

  /** ノード管理用リスト */
  private _list_nodes: Array<AbstractNode>;

  /**
   * ルータ管理用リスト
   */
  private _list_routers: Array<AbstractNode>;

  /**
   * スイッチ管理用リスト
   */
  private _list_switches: Array<AbstractNode>;

  /**
   * ホスト管理用リスト
   */
  private _list_hosts: Array<AbstractNode>;

  /**
   * 生成したケーブル数を示す値
   */
  private _cables: number;

  /**
   * 通信用ソケット
   */
  private _socket: AbstractSocket;

  /** シングルトンパターンの実装 */
  public static get guimanager(): GUIManager {
    if (this._guimanager == null) {
      this._guimanager = new GUIManager();
    }

    return this._guimanager;
  }

  /** コンストラクタ */
  private constructor() {
    this._list_nodes = new Array();
    this._list_routers = new Array();
    this._list_switches = new Array();
    this._list_hosts = new Array();
    this._cables = 0;
  }

  /** ノード管理用リストを返す */
  public get list_nodes() {
    return this._list_nodes;
  }

  /** ノード管理用リストを返す */
  public get list_routers() {
    return this._list_routers;
  }

  /** ノード管理用リストを返す */
  public get list_switches() {
    return this._list_switches;
  }

  /** ノード管理用リストを返す */
  public get list_hosts() {
    return this._list_hosts;
  }

  public updateCables() {
    return this._cables++;
  }

  public get socket() {
    return this._socket;
  }

  /** ノード管理用リストに新たなノードを追加*/
  public addNode(node: AbstractNode): AbstractNode {
    this._list_nodes.push(node);
    if (node.nodeType == "Router") {
      this._list_routers.push(node);
    } else if (node.nodeType == "Switch") {
      this._list_switches.push(node);
    } else if (node.nodeType == "Host") {
      this._list_hosts.push(node);
    }

    console.log(
      node.UUID + "(" + node.nodeName + ")がguimanagerに追加されました"
    );
    return node;
  }

  /** ノード管理用リストからUUIDに対応するノードオブジェクトを検索 */
  public selectedByUUID(UUID: string): AbstractNode | null {
    let node: AbstractNode;
    for (let i: number = 0; i < this._list_nodes.length; i++) {
      node = this._list_nodes[i];
      if (UUID == node.UUID) {
        return node;
      }
    }
    return null;
  }

  public addSocket(socket: AbstractSocket) {
    this._socket = socket;
  }
}
