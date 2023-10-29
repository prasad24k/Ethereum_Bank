//SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;

contract Bank{
    address public owner;
    mapping(address => uint256)private userbalance;

    constructor() {
        owner=msg.sender;

    }
    modifier onlyOwner() {
        require(msg.sender ==owner,"you are not the owner of this contract");
        _;

    }
    function deposite() public payable returns(bool){
        require(msg.value > 10 wei,"please deposite at lest 10 wei");
        userbalance[msg.sender]+=msg.value;
        return true;

    }
    function withdrow(uint256 _amount)public payable returns(bool){
        require(_amount <= userbalance[msg.sender],"you dont have suficient balance");
        userbalance[msg.sender] -=_amount;
        payable(msg.sender).transfer(_amount);
        return true;
    }
    function getbalance()public view returns(uint256){
        return userbalance[msg.sender];

    }
    function getcontractbalance()public view onlyOwner returns(uint256){
        return address(this).balance;

    }
    function withdrawfunds(uint256 _amount)public payable onlyOwner returns(bool){
        payable (owner).transfer(_amount);
        return true;
    }
}