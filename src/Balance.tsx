import { useWeb3React } from "@web3-react/core";
import * as React from "react";

interface IBalanceProps {
  balance: any;
}

const Balance: React.FC<IBalanceProps> = ({ balance }) => {
  const { library } = useWeb3React();
  return (
    <>
      <h2>Balance</h2>
      <p>E{library.utils.fromWei(balance)} ETH</p>
    </>
  );
};

export default Balance;
