import { useContext } from "react";
import { StateContext } from "@/pages";
import { exitCode } from "process";

export const CountLabel = () => {
  const { connectMode } = useContext(StateContext);
  return <div>{connectMode}</div>;
};
