import { AbstractMessage } from "../../AbstractMessage";

export class LAUNCH_NETWORK extends AbstractMessage {
  /**
   * ネットワークトポロジ
   */
  private _networkTopology!: string;

  public constructor() {
    super();
    this.messageType = "LAUNCH_NETWORK";
  }

  public set networkTopology(networkTopology: string) {
    this._networkTopology = networkTopology;
  }

  public get networkTopology() {
    return this._networkTopology;
  }
}
