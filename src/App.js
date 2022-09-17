import React, { useState } from "react";
import { ethers } from "ethers";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as _ from "lodash";

import auction from "./auction.json";
import "./App.css";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Unstable_Grid2";
import Item from "@mui/material/Grid";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";

const FormField = ({ label, ...rest }) => {
  const name = _.camelCase(label);

  return (
    <>
      <label className="block mt-4" name={name}>
        {label}
      </label>
      <Field className="border-solid border-[1px] border-teal-700 rounded-md" name={name} {...rest} />
      <ErrorMessage name={name} component="div" />
    </>
  );
};

const App = () => {
  const [isOwner, setIsOwner] = useState(false);
  const [sessionSigner, setSessionSigner] = useState("");
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

  const handleAddAuction = () => {};

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
      <h2 className="mt-10">Auction Initializing</h2>
      <Box
        sx={{
          marginTop: "40px",
          backgroundColor: "white",
          borderRadius: "1rem",
          padding: "20px 40px",
        }}
      >
        <h3>Start an Auction</h3>
        <Formik
          initialValus={{ auctionName: "", auctionAddress: "" }}
          onSubmit={(values) => handleAddAuction(values)}
        >
          {() => (
            <Form>
              <FormField label="Auction Name" />
              <FormField label="Auction Address" />
              <Box>
                <Button sx={{ marginTop: "20px" }} variant="contained">
                  Start Auction
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
      <Box sx={{ marginTop: "40px" }}>
        <h2>Auctions</h2>
        <Grid2 container xs={12} sm={6} md={4}>
          <Item>
            <Box
              sx={{
                marginTop: "40px",
                backgroundColor: "white",
                borderRadius: "1rem",
                padding: "20px 40px",
              }}
            >
              <h3>Name of Auction</h3>
              <h4>Auction Address</h4>
              <ul>
                <li>Owner: 0x123...</li>
                <li>Blockchain: blockchain</li>
              </ul>
              <InputLabel shrink>Place a Bid</InputLabel>
              <Input placeholder="Bid Amount" />
              <Button sx={{ marginLeft: "20px" }} variant="contained">
                Bid
              </Button>
            </Box>
          </Item>
        </Grid2>
      </Box>
    </>
  );
};

export default App;
