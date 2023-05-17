import { AbstractMessage } from "../../AbstractMessage";

export class L2TP_TUNNEL_ID_REQUEST extends AbstractMessage {
  public constructor() {
    super();
    this.messageType = "L2TP_TUNNEL_ID_REQUEST";
  }
}
