import { createContext, useState } from "react";

const StateContext = createContext({
  connectMode: false,
  connectStatus: "",
  changeConnectMode: (connectMode: boolean) => {},
  changeConnectStatus: (connectStatus: string) => {},
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

const StateProvider = ({ children }: Props): JSX.Element => {
  const [connectMode, setConnectMode] = useState(false);
  const [connectStatus, setConnectStatus] = useState("");
  const changeConnectMode = (connectMode: boolean) => {
    setConnectMode(connectMode);
  };
  const changeConnectStatus = (connectStatus: string) => {
    setConnectStatus(connectStatus);
  };
  return (
    <StateContext.Provider
      value={{
        connectMode,
        connectStatus,
        changeConnectMode,
        changeConnectStatus,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export { StateContext, StateProvider };
