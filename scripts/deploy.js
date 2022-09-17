// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const Token = await hre.ethers.getContractFactory("MyToken");
  const token = await Token.deploy();

  console.log("Token deployed to: ", token.address);

  const NFT = await hre.ethers.getContractFactory("MyNFT");
  const nft = await NFT.deploy();

  nft.safeMint(deployer.address, 0);

  const Auction = await hre.ethers.getContractFactory("Auction");
  const auction = await Auction.deploy();

  await auction.deployed();

  console.log(`Auction deployed to: ${auction.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
