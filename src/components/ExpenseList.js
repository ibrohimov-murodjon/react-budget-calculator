import React from "react";
import ExpenseItem from "./ExpenseItem";
import { MdDelete } from "react-icons/md";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const ExpenseList = ({ expenses, handleEdit, handleDelete, clearItems }) => {
  return (
    <>
      <ul className="list">
        {expenses.map((expense) => {
          return (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          );
        })}
      </ul>
      {expenses.length > 0 && (
        <Box textAlign="center">
          <Button variant="contained" color="error" onClick={clearItems}>
            clear expenses <MdDelete className="btn-icon" />{" "}
          </Button>
        </Box>
      )}
    </>
  );
};

export default ExpenseList;
