import React, { Component } from "react";
import web3 from "web3";
import dai from "../dai.png";
import "./Main.css";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div id="content" className="mt-3">
        <table className="table table-borderless bg-warning text-muted text-center">
          <thead>
            <tr>
              <th className="col-">Staking Balance</th>
              <th className="col-">Reward Balance</th>
            </tr>
          </thead>

          <tbody className="text-center">
            <tr>
              <td>
                {web3.utils.fromWei(this.props.stakingBalance, "Ether")} mDAI
              </td>
              <td>
                {web3.utils.fromWei(this.props.dappTokenBalance, "Ether")} DAPP
              </td>
            </tr>
          </tbody>
        </table>

        <div className="card mb-4">
          <div className="card-body">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                let amount;
                amount = this.input.value.toString();
                amount = web3.utils.toWei(amount, "Ether");
                console.log(this.input.value);
                this.props.stakeTokens(amount);
              }}
              className="mb-3"
            >
              <div>
                <label htmlFor="" className="floa-left">
                  <b>Stake Tokens</b>
                </label>
                <span className="float-right text-muted">
                  Balance :{" "}
                  {web3.utils.fromWei(this.props.daiTokenBalance, "Ether")}
                </span>
              </div>

              <div className="input-group mb-4">
                <input
                  type="number"
                  ref={(input) => {
                    this.input = input;
                    console.log(this.input);
                    //console.log(this.input.value)//no output at the begining because no value has been typed on input text bar
                  }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <img src={dai} height="32" alt="" />
                    &nbsp;&nbsp; mDAI
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block btn-lg"
              >
                STAKE!
              </button>
            </form>

            <button
              type="submit"
              className="btn btn-link btn-block btn-sm btn-unstake"
              onClick={(event) => {
                event.preventDefault();
                this.props.unstakeTokens();
              }}
            >UN-STAKE...</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
