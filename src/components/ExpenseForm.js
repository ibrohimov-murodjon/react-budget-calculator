import React from "react";
import { MdSend } from "react-icons/md";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const ExpenseForm = ({
  charge,
  amount,
  handleCharge,
  handleAmount,
  handleSubmit,
  edit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <TextField
            id="charge"
            className="form-control"
            label="Charge"
            variant="outlined"
            color="info"
            focused
            placeholder="e.g rent"
            value={charge}
            InputProps={{
              style: {
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                width: "100%",
                color: "green",
              },
            }}
            onChange={handleCharge}
          />
        </div>
        <div className="form-group">
          <TextField
            id="amount"
            type="number"
            className="form-control"
            label="Amount"
            variant="outlined"
            color="info"
            focused
            placeholder="e.g 100"
            InputProps={{
              style: {
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                width: "100%",
                color: "green",
              },
            }}
            value={amount}
            onChange={handleAmount}
          />
        </div>
      </div>
      <Box textAlign="center">
        <Button variant="contained" type="submit" className="btn">
          {edit ? "edit" : "submit"}
          <MdSend className="btn-icon" />
        </Button>
      </Box>
    </form>
  );
};

export default ExpenseForm;
