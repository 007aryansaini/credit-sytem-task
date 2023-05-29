import abi from "./contract/Chai.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";

// 0x72de76c327FDAAb3C435459e6Bb4222ABbe354C4

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setaccount] = useState("None ");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "";
      const contractAbi = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("ChainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractAbi,
            signer
          );
          setaccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("please install Metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);
  //console.log(state);
  return (
    <div className='App'>
      <p>Connected Account -{account}</p>
    </div>
  );
}

export default App;
