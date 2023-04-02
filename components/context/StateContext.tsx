import {
  createContext,
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
} from "react";

const StateContext = createContext({
  /*connectMode: false,
  connectStatus: "",
  operatingNode: "",
  changeConnectMode: (connectMode: boolean) => {},
  changeConnectStatus: (connectStatus: string) => {},
  changeOperatingNode: (nodeName: string) => {},


  changeIsConnected: (bool: boolean) => {},
  changeFormMessage: (formMsg: string) =>{},
  changeSentMessage: (sentMsg: string) =>{},
*/
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

const StateProvider = ({ children }: Props): JSX.Element => {
  const [connectMode, setConnectMode] = useState(false);
  const [connectStatus, setConnectStatus] = useState("");
  const [operatingNode, setOperatingNode] = useState("");

  const [socket, setSocket] = useState<WebSocket>();
  const [isConnected, setIsConnected] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [sentMessage, setSentMessage] = useState("");

  const [msg, setMsg] = useState("");

  //const [isConnected, setIsConnected] = useState(false);
  //const [formMessage, setFormMessage] = useState("");
  //const [sentMessage, setSentMessage] = useState("");

  const changeConnectMode = useCallback((connectMode: boolean) => {
    setConnectMode(connectMode);
  }, []);
  const changeConnectStatus = useCallback((connectStatus: string) => {
    setConnectStatus(connectStatus);
  }, []);
  const changeOperatingNode = useCallback((nodeName: string) => {
    setOperatingNode(nodeName);
  }, []);

  const changeIsConnected = useCallback((bool: boolean) => {
    setIsConnected(bool);
  }, []);
  const changeFormMessage = useCallback((formMsg: string) => {
    setFormMessage(formMsg);
  }, []);
  const changeSentMessage = useCallback((sentMsg: string) => {
    setSentMessage(sentMsg);
  }, []);

  const changeMsg = useCallback((msg: string) => {
    setMsg(msg);
  }, []);

  useEffect(() => {
    /*const newSocket = new WebSocket("ws://localhost:8080/socket");

    newSocket.onopen = function () {
      changeIsConnected(true);
      console.log("Connected");
    };
    newSocket.onclose = function () {
      console.log("closed");
      changeIsConnected(false);
    };
    newSocket.onmessage = function (event) {
      changeSentMessage(event.data);
    };
    setSocket(newSocket);
    //console.log(newSocket);
    return () => {
      if (newSocket == null) {
        return;
      }
      newSocket.close();
    };*/
  }, []);

  return (
    <StateContext.Provider
      value={{
        connectMode,
        connectStatus,
        changeConnectMode,
        changeConnectStatus,
        operatingNode,
        changeOperatingNode,

        socket,
        isConnected,
        formMessage,
        sentMessage,
        changeIsConnected,
        changeFormMessage,
        changeSentMessage,

        msg,
        changeMsg,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export { StateContext, StateProvider };
