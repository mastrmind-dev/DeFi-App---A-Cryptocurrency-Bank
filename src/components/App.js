import React, { Component } from "react";
import Navbar from "./Navbar";
import "./App.css";
import Web3 from "web3";
import DaiToken from "../abis/DaiToken.json";
import DappToken from "../abis/DappToken.json";
import TokenFarm from "../abis/TokenFarm.json";
import Main from "./Main";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: "0x0",
      daiToken: {},
      dappToken: {},
      tokenFarm: {},
      daiTokenBalance: "0",
      dappTokenBalance: "0",
      stakingBalance: "0",
      loading: true,
    };

    this.initialize();
  }

  // async loadWeb3() {
  //   if (window.ethereum) {
  //     window.web3 = new Web3(window.ethereum);
  //     await window.ethereum.request({ method: "eth_requestAccounts" });
  //   } else if (window.web3) {
  //     window.web3 = new Web3(window.web3.currentProvider);
  //   } else {
  //     window.alert("Please install metamask to use this DeFi App!");
  //   }
  // }

  async initialize() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } else {
        alert("Please install metamask first!");
      }
    } catch (error) {
      alert('please connect to your account!');
    }
  }

  async loadBlockchainData() {
    if (this.state.loading) {
      console.log("loading blockchain data....");
    }

    const web3 = window.web3; //This is just for easy. So we don't have to type "window.web3" alaways, instead we can type just 'web3'.
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    console.log("current account address =>");
    console.log(this.state.account);

    const networkId = await web3.eth.net.getId();
    console.log("networkId =>");
    console.log(networkId);

    await this.daiTokenBalance(networkId, web3);
    await this.dappTokenBalance(networkId, web3);
    await this.stakingBalance(networkId, web3);

    this.setState({ loading: false });

    if (!this.state.loading) {
      console.log("loading blockchain data is finished!");
    }
  }

  async daiTokenBalance(networkId, web3) {
    const daiTokenData = await DaiToken.networks[networkId];
    console.log("daiToken Data =>");
    console.log(daiTokenData);

    const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address);
    this.setState({ daiToken }); //This will update the value of "this.state.daiToken" (because assinging variable's name is same as state property.)
    console.log("daiToken Contract =>");
    console.log(daiToken);

    const daiTokenBalance = await daiToken.methods
      .balanceOf(this.state.account)
      .call();
    this.setState({ daiTokenBalance: daiTokenBalance.toString() });
    console.log("daiToken balance =>");
    console.log(this.state.daiTokenBalance);
  }

  async dappTokenBalance(networkId, web3) {
    const dappTokenData = await DappToken.networks[networkId];
    console.log("dappToken Data =>");
    console.log(dappTokenData);

    const dappToken = new web3.eth.Contract(
      DappToken.abi,
      dappTokenData.address
    );
    this.setState({ dappToken });
    console.log("dappToken Contract =>");
    console.log(dappToken);

    const dappTokenBalance = await dappToken.methods
      .balanceOf(this.state.account)
      .call();
    this.setState({ dappTokenBalance: dappTokenBalance.toString() });
    console.log("dappToken Balance =>");
    console.log(dappTokenBalance);
  }

  async stakingBalance(networkId, web3) {
    const tokenFarmData = TokenFarm.networks[networkId];
    console.log("TokenFarm Data =>");
    console.log(tokenFarmData);

    const tokenFarm = new web3.eth.Contract(
      TokenFarm.abi,
      tokenFarmData.address
    );
    this.setState({ tokenFarm });
    console.log("tokenFarm Contract =>");
    console.log(tokenFarm);

    const stakingBalance = await tokenFarm.methods
      .stakingBalance(this.state.account)
      .call();
    this.setState({ stakingBalance: stakingBalance.toString() });
    console.log("Staking Balance =>");
    console.log(this.state.stakingBalance);
  }

  render() {
    let content;
    if (this.state.loading === true) {
      content = <p>loading...</p>;
    } else {
      content = (
        <Main
          daiTokenBalance={this.state.daiTokenBalance}
          dappTokenBalance={this.state.dappTokenBalance}
          stakingBalance={this.state.stakingBalance}
        />
      );
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main
              role="main"
              className="col-lg-12 ml-auto mr-auto"
              style={{ maxWidth: "600px" }}
            >
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                ></a>
                {content}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
