import React, { useEffect, useState } from "react";
import { ethers, BugNumber } from "ethers";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import auctionContract from "../auction.json";
import { BidForm } from "./BidForm";

export const AuctionCard = ({ auctionAddress }) => {
  const [auctionState, setAuctionState] = useState("Loading...");
  const [ownerAddress, setOwnerAddress] = useState("Loading...");
  const [network, setNetwork] = useState("Loading...");
  const [nftAddress, setNftAddress] = useState("Loading...");
  const [nftId, setNftId] = useState(0);
  const [erc20Token, setErc20Token] = useState("Loading...");
  const [highestBidder, setHighestBidder] = useState();
  const [maxBid, setMaxBid] = useState(0);
  const [signerAddress, setSignerAddress] = useState("");

  async function handleAuction() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setSignerAddress(signer.address);

      const contract = new ethers.Contract(
        auctionAddress,
        auctionContract.abi,
        signer
      );
      try {
        setErc20Token(await contract.token());
        setOwnerAddress(await contract.owner().address);
        setNftAddress(await contract.nft().address);
        setNftId(await contract.nftId());
        setHighestBidder(await contract.topBidder());
        setMaxBid(await contract.topBidAmount());
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    handleAuction();
  }, []);

  async function handleFinalization() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        auctionAddress,
        auctionContract.abi,
        signer
      );
      try {
        await contract.finalizeAuction();
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <Box
      sx={{
        marginTop: "40px",
        marginRight: "20px",
        backgroundColor: "white",
        borderRadius: "1rem",
        padding: "20px 40px",
      }}
    >
      <h3>{auctionAddress.auctionName}</h3>
      <p
        className={
          auctionState === "In Progress"
            ? "text-green-600"
            : auctionState === "Bidding Complete"
            ? "text-red-600"
            : "text-gray-900"
        }
      >
        {auctionState}
        {highestBidder &&
          ` - Leading Bidder: ${highestBidder} with ${maxBid} ${erc20Token}`}
      </p>
      <BidForm auctionState={auctionState} auctionAddress={auctionAddress} />
      <ul>
        <dl>Auction Address: </dl>
        <dt>{auctionAddress.auctionAddress ?? "Loading..."}</dt>
        <dl>Owner</dl>
        <dt>{ownerAddress}</dt>
        <dl>Network</dl>
        <dt>Goerli</dt>
        <dl>NFT Address</dl>
        <dt>{nftAddress}.</dt>
        <dl>NFT ID</dl>
        <dt>{nftId}</dt>
        <dl>ERC20 Token</dl>
        <dt>{erc20Token}</dt>
        {ownerAddress === signerAddress && (
          <Button variant="contained" onClick={handleFinalization}>
            Finalize Auction
          </Button>
        )}
      </ul>
    </Box>
  );
};
