 //require("@nomiclabs/hardhat-ethers");
 require("@nomiclabs/hardhat-waffle");

 const PRIVATE_KEY = "575e6d219787c2b5cb00afed89bbce0643b1e21c5d3e17c7323ce7ba879389dd";


 module.exports = {
     solidity: "0.8.4",
     networks: {
       mainnet: {
         url: `http://176.236.121.139:9656/ext/bc/C/rpc`,
           accounts: [`${PRIVATE_KEY}`]
       },
       fuji: {
         url: `https://api.avax-test.network/ext/bc/C/rpc`,
           //accounts: [`${PRIVATE_KEY}`]
       }
     }
 };