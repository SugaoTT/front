import { useContext } from "react";
import { StateContext } from "@/components/context/StateContext";

export const DisplayState = () => {
  const { connectMode } = useContext(StateContext);

  const output = () => {
    console.log("DisplayState: コネクトモードを表示", connectMode);
  };

  return <button onClick={output}>コネクトモードを表示</button>;
};
