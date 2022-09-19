import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { ethers } from "ethers";

import { FormField } from "./FormField";

const AddAuctionSchema = yup.object().shape({
  auctionName: yup.string().required("Please add a name for your auction."),
  auctionAddress: yup
    .string()
    .required("Please add the address for your auction."),
});

export const AddAuction = ({ auctionAddresses, setAuctionAddresses }) => {
  const [auctionAddress, setAuctionAddress] = useState("");
  const [auctionName, setAuctionName] = useState("");

  const handleAddAuction = (vals) => {
    setAuctionAddress(vals.auctionAddress);
    setAuctionName(vals.auctionName);
    setAuctionAddresses([
      ...auctionAddresses,
      { ...auctionAddress, auctionName },
    ]);
  };
  
  return (
    <>
      <h2 className="mt-10">Auction Initializing</h2>
      <Formik
        initialValues={{ auctionName: "", auctionAddress: "" }}
        onSubmit={(values) => handleAddAuction(values)}
        validationSchema={AddAuctionSchema}
      >
        {() => (
          <Form>
            <FormField label="Auction Name" />
            <FormField label="Auction Address" />
            <Box>
              <Button
                sx={{ marginTop: "20px" }}
                variant="contained"
                type="submit"
              >
                Add Auction
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};
