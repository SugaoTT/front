import { Terminal } from "xterm";
import { AbstractNode } from "./AbstractNode";
import { AbstractSocket } from "./AbstractSocket";
import { Console } from "../components/rightBar/Console";
import { Handler } from "./handler/Handler";
import { AbstractMessage } from "./message/AbstractMessage";
import { L2TP_INFO_REQUEST } from "./message/concrete/toServer/L2TP_INFO_REQUEST";
import { L2TP_TUNNEL_ID_REQUEST } from "./message/concrete/toServer/L2TP_TUNNEL_ID_REQUEST";

export class GUIManager {
  /** 通信に利用するハンドラー*/
  private _handler: Handler;

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
   * L2TPのセッションIDを管理
   */
  /** これサーバで実装しないとダメ */
  private _l2tp_sessionID: number = 0;

  /**
   * L2TPのトンネルIDを管理
   */
  /** これサーバで実装しないとダメ */
  private _l2tp_tunnelID: number = 0;

  /**
   * 通信用ソケット
   */
  private _socket: AbstractSocket;

  /** ターミナル */
  private _currentConsole: Console;

  /** シングルトンパターンの実装 */
  public static get guimanager(): GUIManager {
    if (this._guimanager == null) {
      this._guimanager = new GUIManager();
    }

    return this._guimanager;
  }

  /** ハンドラーを示すゲッター */
  public get handler(): Handler {
    return this._handler;
  }

  /** コンストラクタ */
  private constructor() {
    this._handler = new Handler();
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

  /** ハンドラーのメソッドをカプセル化*/
  public eventHandle(msg: AbstractMessage): void {
    this._handler.handleToServer.bind(this._handler)(msg);
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

  public getUUIDByNodeName(nodeName: string): string | null {
    let node: AbstractNode;
    for (let i: number = 0; i < this._list_nodes.length; i++) {
      node = this._list_nodes[i];
      if (nodeName == node.nodeName) {
        return node.UUID;
      }
    }
    return null;
  }

  public addSocket(socket: AbstractSocket) {
    this._socket = socket;
  }

  public set currentConsole(console: Console) {
    this._currentConsole = console;
  }

  public get currentConsole() {
    return this._currentConsole;
  }

  /** これサーバで実装しないとダメ */
  public getL2TPInfo(
    srcUUID: string,
    srcEthName: string,
    dstUUID: string,
    dstEthName: string
  ): number {
    //Nodeを生成するメッセージを作成してHandlerへ送る
    let tmp_msg: L2TP_INFO_REQUEST = new L2TP_INFO_REQUEST();
    tmp_msg.srcUUID = srcUUID;
    tmp_msg.srcEthName = srcEthName;
    tmp_msg.dstUUID = dstUUID;
    tmp_msg.dstEthName = dstEthName;

    GUIManager.guimanager.eventHandle(tmp_msg);

    //this._l2tp_sessionID++;
    return this._l2tp_sessionID;
  }
  /** これサーバで実装しないとダメ */
  public getNextTunnelID(): number {
    let tmp_msg: L2TP_TUNNEL_ID_REQUEST = new L2TP_TUNNEL_ID_REQUEST();
    GUIManager.guimanager.eventHandle(tmp_msg);
    //this._l2tp_tunnelID += 2;
    return this._l2tp_tunnelID;
  }
}
