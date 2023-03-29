import { useContext } from "react";
import { CountContext } from "@/pages";

export const MinusButton = () => {
  const { minusCount } = useContext(CountContext);

  return <button onClick={minusCount}>-1</button>;
};
