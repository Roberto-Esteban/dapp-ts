import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "./connector";

import logo from "./logo.svg";
import "./App.css";
import Balance from "./Balance";
import Faucet from "./Faucet";

function App() {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  const [balance, setBalance] = useState<String>("0");

  useEffect(() => {
    if (!!library && !!account) {
      library.eth.getBalance(account, function (err: any, result: any) {
        if (err) {
          console.log(err);
        } else {
          // console.log(web3.utils.fromWei(result, "ether") + " ETH");
          setBalance(result);
        }
      });
    }
  }, [account, library]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={connect}>Connect to MetaMask</button>
        {active && account ? (
          <>
            <span>
              Connected with <b>{account}</b>
            </span>
            <Balance balance={balance} />
            <Faucet />
          </>
        ) : (
          <span>Not connected</span>
        )}
        <button onClick={disconnect}>Disconnect</button>
      </header>
    </div>
  );
}

export default App;
