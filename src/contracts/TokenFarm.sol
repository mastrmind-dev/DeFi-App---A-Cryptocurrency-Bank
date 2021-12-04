pragma solidity ^0.5.0;

import "./DaiToken.sol";
import "./DappToken.sol";

contract TokenFarm {
    string public name = "Dapp Token Farm";
    DappToken public dappToken;
    DaiToken public daiToken;

    address public owner;
    address[] public stakers;
    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaken;
    mapping(address => bool) public isStaking;

    constructor(DappToken _dappToken, DaiToken _daiToken) public {
        dappToken = _dappToken;
        daiToken = _daiToken;
        owner = msg.sender; //constructor is called only once when it is deploying by the deployer account and it will never ever be called again. So the owner will be the deployer account for ever.
    }

    //stake tokens
    function stakeTokens(uint256 _amount) public {
        require(_amount > 0, 'amount should be greater than 0');

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

    function issueTokens() public {
        require(msg.sender == owner, 'only owner can issue the tokens');
        address recipient;
        uint balance;
        for(uint i = 0; i < stakers.length; i++){
            recipient = stakers[i];
            balance = stakingBalance[recipient];
            if(balance > 0){
                dappToken.transfer(recipient, balance);
            }
        }
    }
}
