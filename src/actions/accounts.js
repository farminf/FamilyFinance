import database from "../firebase/firebase";
import { addError } from "./errors";

export const addAccount = account => ({ type: "ADD_ACCOUNTS", account });

export const startAddAccount = (accountData = {}) => {
  return (dispatch, getState) => {
    const user_uid = getState().auth.uid;
    const { name = "default", balance = 0 } = accountData;
    const account = {
      name,
      balance
    };
    const appState = getState().demoReducers.demotype;
    if (appState === "demo") {
      dispatch(
        addAccount({
          ...account
        })
      );
    } else {
      return database
        .ref(`users/${user_uid}/accounts/${account.name}`)
        .update(account)
        .then(
          ref => {
            dispatch(
              addAccount({
                ...account
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

export const setAccounts = accounts => ({ type: "SET_ACCOUNTS", accounts });

export const startSetAccounts = () => {
  return (dispatch, getState) => {
    const user_uid = getState().auth.uid;
    const appState = getState().demoReducers.demotype;
    if (appState === "demo") {
      let demoAccounts = [
        {
          balance: 5000,
          name: "Cash"
        },
        {
          balance: -65250,
          name: "Credit"
        },
        {
          balance: 99164,
          name: "Debit"
        },

        {
          balance: 50000,
          name: "Saving"
        }
      ];
      dispatch(setAccounts(demoAccounts));
    } else {
      return database
        .ref(`users/${user_uid}/accounts`)
        .orderByKey()
        .once("value")
        .then(
          snapshot => {
            const accounts = [];
            snapshot.forEach(childSnapshot => {
              accounts.push({
                ...childSnapshot.val()
              });
            });
            dispatch(setAccounts(accounts));
          },
          error => {
            console.error(error);
            dispatch(addError({ code: error.code, message: error.message }));
          }
        );
    }
  };
};

export const deleteAccount = ({ name } = {}) => ({
  type: "DELETE_ACCOUNTS",
  name
});

export const startDeleteAccount = ({ name } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const appState = getState().demoReducers.demotype;
    if (appState === "demo") {
      dispatch(deleteAccount({ name }));
    } else {
      return database
        .ref(`users/${uid}/accounts/${name}`)
        .remove()
        .then(() => {
          dispatch(deleteAccount({ name }));
        });
    }
  };
};

export const editAccount = (name, updates) => ({
  type: "UPDATE_ACCOUNTS",
  name,
  updates
});

export const startEditAccount = (name, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const appState = getState().demoReducers.demotype;
    if (appState === "demo") {
      dispatch(editAccount(name, updates));
    } else {
      return database
        .ref(`users/${uid}/accounts/${name}`)
        .update(updates)
        .then(() => {
          dispatch(editAccount(name, updates));
        });
    }
  };
};

//this one will get the current amount and change it based on the delta Value
export const updateAccountBalance = (name, delta) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const appState = getState().demoReducers.demotype;
    if (appState === "demo") {
      let account = getState().accounts.find(account => {
        return account.name === name;
      });
      dispatch(
        editAccount(name, {
          balance: Number(account.balance) + Number(delta)
        })
      );
    } else {
      return database.ref(`users/${uid}/accounts/${name}/balance`).transaction(
        function(currentBalance) {
          return Number(currentBalance) + Number(delta);
        },
        function(error, committed, snapshot) {
          if (error) {
            console.log("Transaction failed abnormally!", error);
          } else if (!committed) {
            console.log("aborted the transaction");
          } else {
            dispatch(
              editAccount(name, {
                balance: snapshot.val()
              })
            );
          }
        }
      );
    }
  };
};
