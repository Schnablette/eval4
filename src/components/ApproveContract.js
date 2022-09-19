import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";

import Button from "@mui/material/Button";

import { FormField } from "./FormField";

export const BidForm = () => {
  const [approvedAmount, setApprovedAmount] = useState(0);

  const handleApproval = (vals) => {
    setApprovedAmount(vals.amountForContractApproval);
  };

  return (
    <Formik
      initialValues={{ amountForContractApproval: 0 }}
      validationSchema={yup.object().shape({
        amountForContractApproval: yup
          .number()
          .required(
            "Please add number of tokens for which the contract will be approved"
          ),
      })}
      onSubmit={handleApproval}
    >
      {() => (
        <Form>
          <FormField label="Amount for Contract Approval" />
          <Button
            sx={{ marginTop: "1rem", display: "block" }}
            variant="contained"
          >
            Approve Contract
          </Button>
        </Form>
      )}
    </Formik>
  );
};
