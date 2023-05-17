import { AbstractMessage } from "../../AbstractMessage";

export class L2TP_TUNNEL_ID extends AbstractMessage {
  public constructor() {
    super();
    this.messageType = "L2TP_TUNNEL_ID";
  }
}
