const { assert } = require("chai");
const { default: Web3 } = require("web3");

const DaiToken = artifacts.require("DaiToken");
const DappToken = artifacts.require("DappToken");
const TokenFarm = artifacts.require("TokenFarm");

require("chai")
  .use(require("chai-as-promised"))
  .should();

function tokens(n){
    return web3.utils.toWei(n, 'ether');
}

contract("TokenFarm", ([owner, investor]) => {
    var daiToken, dappToken, tokenFarm;
    before(async() => {
        daiToken = await DaiToken.new();
        dappToken = await DappToken.new();
        tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address);
        
        await dappToken.transfer(tokenFarm.address, tokens('1000000'));
        await daiToken.transfer(investor, tokens('100'), {from : owner});
    })

  describe("Mock DAI deployment", async () => {
    it("has a name", async () => {
      const name = await daiToken.name();
      assert.equal(name, "Mock DAI Token");
    });
  });
});
