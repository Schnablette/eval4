import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { ethers } from "ethers";

import Button from "@mui/material/Button";

import { FormField } from "./FormField";
import auctionContract from "../auction.json";

export const BidForm = ({ auctionState, auctionAddress }) => {
  const [bidAmount, setBidAmount] = useState(0);

  async function handleBid(val) {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        auctionAddress,
        auctionContract.abi,
        signer
      );
      try {
        await contract.bid(val.bidAmount);
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <Formik
      initialValues={{ bidAmount: 0 }}
      validationSchema={yup.object().shape({
        bidAmount: yup.number().required("Please add a bid"),
      })}
      onSubmit={handleBid}
    >
      {() => (
        <Form>
          <FormField label="Bid Amount" />
          <Button
            sx={{ marginTop: "1rem", display: "block" }}
            disabled={auctionState === "Bidding Complete"}
            variant="contained"
          >
            Bid
          </Button>
        </Form>
      )}
    </Formik>
  );
};
