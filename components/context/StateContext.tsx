import {
  createContext,
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
} from "react";

const StateContext = createContext({
  connectMode: false,
  connectStatus: "",
  operatingNode: "",
  isConnected: false,
  LoadingStatus: "",
  //LoadingComplete: false,

  changeConnectMode: (connectMode: boolean) => {},
  changeConnectStatus: (connectStatus: string) => {},
  changeOperatingNode: (nodeName: string) => {},

  changeIsConnected: (bool: boolean) => {},

  changeLoadingStatus: (status: string) => {},
  // changeLoadingComplete: (bool: boolean) => {},
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

const StateProvider = ({ children }: Props): JSX.Element => {
  const [connectMode, setConnectMode] = useState(false);
  const [connectStatus, setConnectStatus] = useState("");
  const [operatingNode, setOperatingNode] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [LoadingStatus, setLoadingStatus] = useState("NOT LOADING");
  //const [LoadingComplete, setLoadingComplete] = useState("");

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

  const changeLoadingStatus = useCallback((status: string) => {
    setLoadingStatus(status);
  }, []);

  // const changeLoadingComplete = useCallback((bool: boolean) => {
  //   setLoadingComplete(bool);
  // }, []);

  return (
    <StateContext.Provider
      value={{
        connectMode,
        connectStatus,
        changeConnectMode,
        changeConnectStatus,
        operatingNode,
        changeOperatingNode,

        isConnected,
        changeIsConnected,
        LoadingStatus,
        changeLoadingStatus,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export { StateContext, StateProvider };
