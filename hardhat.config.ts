import { task } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-solhint";
import "hardhat-typechain";
import "@nomiclabs/hardhat-ganache";
import 'hardhat-log-remover';
import { ALCHEMY_KEY } from './const';

task("accounts", "Prints the list of accounts", async () => {
  // const accounts = await ethers.getSigners();

  // for (const account of accounts) {
  //   console.log(account.address);
  // }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.5.0",
  typechain: {
    outDir: "types",
    target: "ethers-v5",
  },
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`
      }
    }
  }
};

