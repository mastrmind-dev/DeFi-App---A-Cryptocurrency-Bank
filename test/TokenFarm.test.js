const { assert } = require("chai");
const { default: web3 } = require("web3");

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

  describe("Dapp Token deployment", async () => {
    it("has a name", async () => {
      const name = await dappToken.name();
      assert.equal(name, "DApp Token");
    });
  });

  describe('Token Farm Deployment', async ()=> {
    it('has a name', async () => {
      const name = await tokenFarm.name();
      assert.equal(name, 'Dapp Token Farm');
    })

    it('contract has tokens', async()=>{
      const balance = await dappToken.balanceOf(tokenFarm.address);
      assert.equal(balance.toString(), tokens('1000000'))
    })
  })

describe('Farming tokens', async()=>{
  it('rewards investors for staking mDai tokens', async () => {
    //check current mDai balance of the investor before staking
    let result = await daiToken.balanceOf(investor);
    assert.equal(result.toString(), tokens('100'), 'correct the mDai balance of investor before staking');

    await daiToken.approve(tokenFarm.address, tokens('100'), {from : investor});
    await tokenFarm.stakeTokens(tokens('100'), {from : investor});

    result = await daiToken.balanceOf(investor);
    assert.equal(result.toString(), tokens('0'), 'correct the mDai balance of investor after staking');

    result = await daiToken.balanceOf(tokenFarm.address);
    assert.equal(result.toString(), tokens('100'), 'correct the mDai balance of Token Farm after staking');

    result = await tokenFarm.stakingBalance(investor);
    assert.equal(result.toString(), tokens('100'), 'correct the staked mDai balance of investor after staking');

    result = await tokenFarm.isStaking(investor);
    assert.equal(result, true, 'correct the staking status after staking');


  })
})


});
