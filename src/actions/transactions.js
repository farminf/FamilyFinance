import database from "../firebase/firebase";
import moment from "moment";
import _ from "lodash";
import { addError } from "./errors";
//{storage}

export const addTransaction = transaction => ({
  type: "ADD_TRANSACTION",
  transaction
});

export const startAddTransaction = (transactionData = {}) => {
  return (dispatch, getState) => {
    const user_uid = getState().auth.uid;
    const appState = getState().demoReducers.demotype;
    const {
      type = "",
      amount = 0,
      description = "",
      account = "",
      category = "",
      date = "",
      transferFrom = "",
      transferTo = ""
    } = transactionData;
    const transaction = {
      type,
      amount,
      description,
      account,
      category,
      date,
      transferFrom,
      transferTo
    };
    if (appState === "demo") {
      return new Promise((resolve, reject) => {
        dispatch(
          addTransaction({
            id: String(moment().unix()),
            ...transaction
          })
        );
        resolve();
      });
    } else {
      return database
        .ref(`users/${user_uid}/transactions`)
        .push(transaction, err => {
          if (err !== null) {
            console.log(err);
            return null;
          }
        })
        .then(
          ref => {
            dispatch(
              addTransaction({
                id: ref.key,
                ...transaction
              })
            );
          },
          error => {
            console.error("error: " + error);
            dispatch(addError({ code: error.code, message: error.message }));
          }
        );
    }
  };
};

export const setTransactions = transactions => ({
  type: "SET_TRANSACTIONS",
  transactions
});

export const startSetTransactions = (
  fromMoment = moment()
    .startOf("month")
    .valueOf(),
  toMoment = moment()
    .endOf("month")
    .valueOf()
) => {
  return (dispatch, getState) => {
    const user_uid = getState().auth.uid;
    const appState = getState().demoReducers.demotype;
    if (appState === "demo") {
      //TODO timestamp needs to be better
      let demoTransactions = [
        {
          id: "-LBAcYgAg0twZp1saPbN",
          account: "Debit",
          amount: Math.floor(Math.random() * 10000) + 5500,
          category: "Groceries",
          date: fromMoment + Math.floor(Math.random() * 864000000) + 86400000,
          description: "SuperMarket",
          transferFrom: "",
          transferTo: "",
          type: "Expense"
        },
        {
          id: "-LBAcYgAg0twZp1saaaN",
          account: "Debit",
          amount: 100000,
          category: "Salary",
          date: fromMoment,
          description: "salary",
          transferFrom: "",
          transferTo: "",
          type: "Income"
        },
        {
          id: "-LBDA6K_s1izssgKMNnn",
          account: "Debit",
          amount: Math.floor(Math.random() * 5000) + 3600,
          category: "Eating Out",
          date: toMoment - Math.floor(Math.random() * 864000000) + 86400000,
          description: "Mexican",
          transferFrom: "",
          transferTo: "",
          type: "Expense"
        },
        {
          id: "-LB1vVqRNpJqX5Ui7fUr",
          account: "Debit",
          amount: Math.floor(Math.random() * 4000) + 1000,
          category: "Pet",
          date: fromMoment + Math.floor(Math.random() * 864000000) + 86400000,
          description: "food",
          transferFrom: "",
          transferTo: "",
          type: "Expense"
        },
        {
          id: "-LAt-H-1TUPz7XtZrkSP",
          account: "Cash",
          amount: Math.floor(Math.random() * 1500) + 1000,
          category: "Eating Out",
          date: fromMoment + Math.floor(Math.random() * 864000000) + 86400000,
          description: "Pizza",
          transferFrom: "",
          transferTo: "",
          type: "Expense"
        },
        {
          id: "-LAnRaKGSRGLq8Xf6m6u",
          account: "Credit",
          amount: Math.floor(Math.random() * 8500) + 6500,
          category: "Car",
          date: fromMoment + Math.floor(Math.random() * 864000000) + 86400000,
          description: "Benzin",
          transferFrom: "",
          transferTo: "",
          type: "Expense"
        },
        {
          id: "-LAcIukNGJaiBkUJIVY9",
          account: "Debit > Credit",
          amount: 1500,
          category: "Transfer",
          date: fromMoment - Math.floor(Math.random() * 864000000) + 86400000,
          description: "Transfer",
          transferFrom: "Debit",
          transferTo: "Credit",
          type: "Transfer"
        },
        {
          id: "-LAcIukNGJaiBkfGIVY9",
          account: "Credit",
          amount: Math.floor(Math.random() * 30000) + 23000,
          category: "Trip",
          date: fromMoment - Math.floor(Math.random() * 864000000) + 86400000,
          description: "Rome",
          transferFrom: "",
          transferTo: "",
          type: "Expense"
        }
      ];
      dispatch(
        setTransactions(_.orderBy(demoTransactions, ["date"], ["desc"]))
      );
    } else {
      return database
        .ref(`users/${user_uid}/transactions`)
        .orderByChild("date")
        .startAt(fromMoment)
        .endAt(toMoment)
        .once("value")
        .then(
          snapshot => {
            const transactions = [];
            snapshot.forEach(childSnapshot => {
              transactions.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
              });
            });
            dispatch(
              setTransactions(_.orderBy(transactions, ["date"], ["desc"]))
            );
          },
          error => {
            console.error(error);
            dispatch(addError({ code: error.code, message: error.message }));
          }
        );
    }
  };
};

export const deleteTransaction = ({ id } = {}) => ({
  type: "DELETE_TRANSACTION",
  id
});

export const startDeleteTransaction = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const appState = getState().demoReducers.demotype;
    if (appState === "demo") {
      return new Promise((resolve, reject) => {
        dispatch(deleteTransaction({ id }));
        resolve();
      });
    } else {
      return database
        .ref(`users/${uid}/transactions/${id}`)
        .remove()
        .then(
          () => {
            dispatch(deleteTransaction({ id }));
          },
          error => {
            console.error(error);
          }
        );
    }
  };
};

export const editTransaction = (id, updates) => ({
  type: "UPDATE_TRANSACTION",
  id,
  updates
});

export const startEditTransaction = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const appState = getState().demoReducers.demotype;
    if (appState === "demo") {
      return new Promise((resolve, reject) => {
        dispatch(editTransaction(id, updates));
        resolve();
      });
    } else {
      return database
        .ref(`users/${uid}/transactions/${id}`)
        .update(updates, err => {
          console.log(err);
        })
        .then(() => {
          dispatch(editTransaction(id, updates));
        });
    }
  };
};
