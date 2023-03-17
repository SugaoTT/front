import { useRef } from "react";

export class WebSocketCreater {
  socketRef = useRef<WebSocket>();
  [isConnected, setIsConnected];
  useState();
  [formMessage, setFormMessage];
  useState();
  [sentMessage, setSentMessage];
  useState();

  sendData = (event: any) => {
    event.preventDefault();
    setFormMessage(event.target[0].value);
    socketRef.current?.send(event.target[0].value);
  };

  useEffect() {}
}
