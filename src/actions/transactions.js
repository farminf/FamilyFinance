//@flow
/* eslint-disable no-unused-vars */

import database from "../firebase/firebase";
import moment from "moment";
import _ from "lodash";
import { addError } from "./errors";
import { demoTransactions } from "./demoTransactions";
//{storage}

type Type = "Expense" | "Income" | "Transfer";
type Transaction = {
  id: string,
  type: string,
  amount: number,
  description: string,
  account: string,
  category: string,
  date: number,
  transferFrom: string,
  transferTo: string,
};

type Transactions = Array<Transaction>;

export const addTransaction = (transaction: Transaction) => ({
  type: "ADD_TRANSACTION",
  transaction,
});

export const startAddTransaction = (transactionData: Transaction = {}) => {
  return (dispatch: any, getState: any) => {
    const user_uid = getState().auth.uid;
    const appState = getState().demoReducers.demotype;
    const {
      type = "",
      amount = 0,
      description = "",
      account = "",
      category = "",
      date = 0,
      transferFrom = "",
      transferTo = "",
    } = transactionData;
    const transaction = {
      type,
      amount,
      description,
      account,
      category,
      date,
      transferFrom,
      transferTo,
    };
    if (appState === "demo") {
      return (new Promise((resolve, reject) => {
        dispatch(
          addTransaction({
            id: String(moment().unix()),
            ...transaction,
          })
        );
        resolve();
      }): Function);
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
                ...transaction,
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

export const startAddBatchTransaction = (transactions: Transactions) => {
  const promises = transactions.map(transaction =>
    startAddTransaction(transaction)
  );
  new Promise.all(promises).then(res => console.log("add batch trans", res));
};

export const setTransactions = (transactions: Transactions) => ({
  type: "SET_TRANSACTIONS",
  transactions,
});

export const startSetTransactions = (
  fromMoment: number = moment()
    .startOf("month")
    .valueOf(),
  toMoment: number = moment()
    .endOf("month")
    .valueOf()
) => {
  return (dispatch: any, getState: any) => {
    const user_uid = getState().auth.uid;
    const appState = getState().demoReducers.demotype;
    if (appState === "demo") {
      //TODO timestamp needs to be better
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
                ...childSnapshot.val(),
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

export const deleteTransaction = ({ id }: any = {}) => ({
  type: "DELETE_TRANSACTION",
  id,
});

export const startDeleteTransaction = ({ id }: any = {}) => {
  return (dispatch: any, getState: any) => {
    const uid = getState().auth.uid;
    const appState = getState().demoReducers.demotype;
    if (appState === "demo") {
      return (new Promise((resolve, reject) => {
        dispatch(deleteTransaction({ id }));
        resolve();
      }): Function);
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

export const editTransaction = (id: string, updates: Transaction) => ({
  type: "UPDATE_TRANSACTION",
  id,
  updates,
});

export const startEditTransaction = (id: string, updates: Transaction) => {
  return (dispatch: any, getState: any) => {
    const uid = getState().auth.uid;
    const appState = getState().demoReducers.demotype;
    if (appState === "demo") {
      return (new Promise((resolve, reject) => {
        dispatch(editTransaction(id, updates));
        resolve();
      }): Function);
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
