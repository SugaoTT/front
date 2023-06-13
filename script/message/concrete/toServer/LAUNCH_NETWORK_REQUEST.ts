import { AbstractMessage } from "../../AbstractMessage";

export class LAUNCH_NETWORK_REQUEST extends AbstractMessage {
  /**
   * ネットワークトポロジ
   */
  private _networkTopology!: string;

  public constructor() {
    super();
    this.messageType = "LAUNCH_NETWORK_REQUEST";
  }

  public set networkTopology(networkTopology: string) {
    this._networkTopology = networkTopology;
  }

  public get networkTopology() {
    return this._networkTopology;
  }
}
