import { AbstractMessage } from "../../AbstractMessage";

export class LAUNCH_NETWORK_SUCCESS extends AbstractMessage {
  public constructor() {
    super();
    this.messageType = "LAUNCH_NETWORK_SUCCESS";
  }
}
