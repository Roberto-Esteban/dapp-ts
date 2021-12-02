import { useWeb3React } from "@web3-react/core";
import * as React from "react";
import faucetjson from "./faucet.json";

const Faucet: React.FC<{}> = () => {
  const [ethToSend, setEthToSend] = React.useState("");
  const [ethToGet, setEthToGet] = React.useState("");
  React.useEffect(() => {
    if (ethToSend && library.utils.toWei(ethToSend)) {
      setEthToSend(ethToSend);
    }
  }, [ethToSend]);
  React.useEffect(() => {
    if (ethToGet) {
      setEthToGet(ethToGet);
    }
  }, [ethToGet]);

  const { library, account } = useWeb3React();
  var contract = new library.eth.Contract(
    faucetjson.abi,
    "0x9f3dC272678D9c7e67CF1f42bdF4BF77bae304b3"
  );

  const deposit = () => {
    console.log(library.utils.toWei(ethToSend));
  };
  const withdraw = () => {
    console.log(library.utils.toWei(ethToGet));
    contract.methods
      .withdraw(library.utils.toWei(ethToGet))
      .send({ from: account });
  };

  return (
    <>
      <h2>Faucet</h2>
      <p>Send ETH and Get ETH</p>
      <h3>Get</h3>
      <input
        value={ethToGet}
        onChange={(e) => setEthToGet(e.target.value)}
      ></input>
      <button onClick={withdraw}>Withdraw</button>
      <h3>Send</h3>
      <input
        value={ethToSend}
        onChange={(e) => setEthToSend(e.target.value)}
      ></input>
      <button onClick={deposit}>Deposit</button>
    </>
  );
};

export default Faucet;
