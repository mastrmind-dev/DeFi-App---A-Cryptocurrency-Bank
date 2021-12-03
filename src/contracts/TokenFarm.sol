pragma solidity ^0.5.0;

import "./DaiToken.sol";
import "./DappToken.sol";

contract TokenFarm {
    string public name = "Dapp Token Farm";
    DappToken public dappToken;
    DaiToken public daiToken;

    address[] public stakers;
    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaken;
    mapping(address => bool) public isStaking;

    constructor(DappToken _dappToken, DaiToken _daiToken) public {
        dappToken = _dappToken;
        daiToken = _daiToken;
    }

    //stake tokens
    function stakeTokens(uint256 _amount) public {
        daiToken.transferFrom(msg.sender, address(this), _amount);

        stakingBalance[msg.sender] = _amount + stakingBalance[msg.sender];

        if (!hasStaken[msg.sender]) {
            stakers.push(msg.sender);
        }

        isStaking[msg.sender] = true;
        hasStaken[msg.sender] = true;
    }

    //2. unstake tokens

    //3.give interests
}
