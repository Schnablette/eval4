import React, { useState } from "react";
import { ethers } from "ethers";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Item from "@mui/material/Grid";

import "./App.css";
import { AddAuction, AuctionCard } from "./components";

const App = () => {
  const [sessionSigner, setSessionSigner] = useState("");
  const [auctionAddresses, setAuctionAddresses] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const isConnected = Boolean(accounts[0]);

  async function connectAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccounts(accounts);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setSessionSigner(signer);
    }
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <h1>Auction Contract</h1>
          <p>
            Want to buy an NFT using tokens? This is the place. Each auction
            will show you an NFT, for which you can bid using the tokens
            specified.
          </p>
        </Box>
        <Box>
          {isConnected ? (
            <p>Connected</p>
          ) : (
            <Button onClick={connectAccount} variant="contained">
              Connect
            </Button>
          )}
        </Box>
      </Box>
      <AddAuction {...{ auctionAddresses, setAuctionAddresses }} />
      <Box sx={{ marginTop: "40px" }}>
        <h2>Auctions</h2>
        <Box sx={{ display: "flex" }}>
          {auctionAddresses.length > 0 &&
            auctionAddresses.map((address) => {
              return <AuctionCard auctionAddress={address} />;
            })}
        </Box>
      </Box>
    </>
  );
};

export default App;
