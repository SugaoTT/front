import { useContext } from "react";
import { StateContext } from "@/pages";

export const PlusButton = () => {
  const { changeConnectMode } = useContext(StateContext);
  const { connectMode } = useContext(StateContext);

  console.log(connectMode);

  return <button onClick={changeConnectMode}>+1</button>;
};
