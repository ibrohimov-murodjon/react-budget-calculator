import React, { useState, useEffect } from "react";
import "./App.css";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import AlertForm from "./components/AlertForm";
import { v4 as uuidv4 } from "uuid";

// useState - function that returns [](array) with two values:
// 1) the actual value of the state
// 2) function for updates/control
// default value

// localStorage getItem('item name')
const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];
function App() {
  // --------------- state values -------------
  // all expenses, add expense
  const [expenses, setExpenses] = useState(initialExpenses);
  // single expense
  const [charge, setCharge] = useState("");
  // single amount
  const [amount, setAmount] = useState("");
  // alert
  const [alert, setAlert] = useState({ show: false });
  // edit
  const [edit, setEdit] = useState(false);
  // edit item
  const [id, setId] = useState(0);
  // --------------- useEffect -------------
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);
  // --------------- functionality -------------
  // handle charge
  const handleCharge = (e) => {
    setCharge(e.target.value);
  };
  // handle amount
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  // handle alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };
  // handle submit
  const handleSubmit = (e) => {
    console.log(charge, amount);
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({
          type: "success",
          text: `item name edited to ${charge} and amount is now ${amount}`,
        });
      } else {
        const singeExpense = { id: uuidv4(), charge, amount };
        setExpenses([...expenses, singeExpense]);
        handleAlert({ type: "success", text: "item added" });
      }
      setCharge("");
      setAmount("");
    } else {
      // handle alert called
      handleAlert({
        type: "danger",
        text: `charge can't be empty value and amount has to be bigger than zero`,
      });
    }
  };
  // clear all items
  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "all items deleted" });
  };
  // deleting single item
  const handleDelete = (id, charge, amount) => {
    let tempExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: `item deleted` });
  };
  // editing single item
  const handleEdit = (id) => {
    let expense = expenses.find((item) => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };
  return (
    <>
      {alert.show && <AlertForm type={alert.type} text={alert.text} />}
      <AlertForm />
      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      <h1>
        total spending :{" "}
        <span className="total">
          ${" "}
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
