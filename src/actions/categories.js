import database from "../firebase/firebase";
import { addError } from "./errors";
import moment from "moment";

export const addCategory = category => ({ type: "ADD_CATEGORIES", category });

export const startAddCategory = (categoryData = {}) => {
  return (dispatch, getState) => {
    const user_uid = getState().auth.uid;
    const { name = "default" } = categoryData;
    const category = {
      name
    };
    const appState = getState().demoReducers.demotype;
    if (appState === "demo") {
      return new Promise((resolve, reject) => {
        dispatch(
          addCategory({
            id: String(moment().unix()),
            ...category
          })
        );
        resolve();
      });
    } else {
      return database
        .ref(`users/${user_uid}/categories`)
        .push(category, err => {
          if (err !== null) {
            console.log(err);
            return null;
          }
        })
        .then(
          ref => {
            dispatch(
              addCategory({
                id: ref.key,
                ...category
              })
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

export const setCategories = categories => ({
  type: "SET_CATEGORIES",
  categories
});

export const startSetCategories = () => {
  return (dispatch, getState) => {
    const user_uid = getState().auth.uid;
    const appState = getState().demoReducers.demotype;
    if (appState === "demo") {
      let demoCategories = [
        {
          id: "-L8reNNBAmNOsWagxsQw",
          name: "Balance"
        },
        {
          id: "-L3YlxuvcKHwQEzmzEjM",
          name: "Bill"
        },

        {
          id: "-L3Ym0nCKi1lmGht8u2H",
          name: "Car"
        },
        {
          id: "-L3YooRkNcy1sR_J7Ejr",
          name: "Car Sharing"
        },
        {
          id: "-LAOWn2Ub1ROjPZKP2OR",
          name: "Charities"
        },
        {
          id: "-L96KyltKgVK4juUr2UV",
          name: "Clothing"
        },

        {
          id: "-L3YhzZat6uvp35i7eZI",
          name: "Eating Out"
        },
        {
          id: "-L3YlywfYMtXL8wFKqnH",
          name: "Electricity"
        },
        {
          id: "-LAMkdSqjVu8O-2dmT0S",
          name: "Entertainment"
        },
        {
          id: "-L3Yi2U7gDMH-T_IUtyQ",
          name: "Gas"
        },
        {
          id: "-LAOWn2ax-l3DZ5Jdgnh",
          name: "Gifts"
        },
        {
          id: "-L3YiJpDMjEJQY8wmsDS",
          name: "Groceries"
        },
        {
          id: "-L6IgQz0kyVC1ovWVAn1",
          name: "Health and Beauty"
        },
        {
          id: "-L3YmLhi-AOUu5Bk1gmf",
          name: "Hotel"
        },
        {
          id: "-L7pA2XfO3g42SuqseFW",
          name: "Housing"
        },
        {
          id: "-L68MTCo4QNnOLb6AnoB",
          name: "Internet"
        },
        {
          id: "-LABtx9zcVRNgm187Wz8",
          name: "Lent"
        },
        {
          id: "-L3Yi7Pn8oweF7x-_G_4",
          name: "Loan"
        },
        {
          id: "-LAOWn2_47OhGjUdiGAx",
          name: "Other"
        },

        {
          id: "-LAOWn2bpOOIY6dS5Sp1",
          name: "Pet"
        },
        {
          id: "-LAOWn2bpOOIY6dS5Sp2",
          name: "Phones"
        },

        {
          id: "-L3YmPVK7iY21_943zhn",
          name: "Public Transport"
        },
        {
          id: "-L3Yi0xZGhirPEo4yo-h",
          name: "Rent"
        },
        {
          id: "-L3YhxCs_QHOgiPFeEG6",
          name: "Salary"
        },
        {
          id: "-LAOWn2ax-l3DZ5Jdgnj",
          name: "Savings"
        },
        {
          id: "-L3Yi3XLtS121zMRAaGI",
          name: "Tolls"
        },
        {
          id: "-L3YmMyRpICdeZSy7VH5",
          name: "Train"
        },
        {
          id: "-LAOWn2ax-l3DZ5Jdgni",
          name: "Travel"
        },

        {
          id: "-LAOWn2Z_guncOBbpcGC",
          name: "Utilities"
        },
        {
          id: "-LAOWn2bpOOIY6dS5Sp3",
          name: "Vacations"
        }
      ];
      dispatch(setCategories(demoCategories));
    } else {
      return database
        .ref(`users/${user_uid}/categories`)
        .orderByChild("name")
        .once("value")
        .then(
          snapshot => {
            const categories = [];
            snapshot.forEach(childSnapshot => {
              categories.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
              });
            });
            dispatch(setCategories(categories));
          },
          error => {
            console.error(error);
            dispatch(addError({ code: error.code, message: error.message }));
          }
        );
    }
  };
};

export const deleteCategory = ({ id } = {}) => ({
  type: "DELETE_CATEGORIES",
  id
});

export const startDeleteCategory = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const appState = getState().demoReducers.demotype;
    if (appState === "demo") {
      return new Promise((resolve, reject) => {
        dispatch(deleteCategory({ id }));
        resolve();
      });
    } else {
      return database
        .ref(`users/${uid}/categories/${id}`)
        .remove()
        .then(() => {
          dispatch(deleteCategory({ id }));
        });
    }
  };
};

export const editCategory = (id, updates) => ({
  type: "UPDATE_CATEGORIES",
  id,
  updates
});

export const startEditCategory = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const appState = getState().demoReducers.demotype;
    if (appState === "demo") {
      return new Promise((resolve, reject) => {
        dispatch(editCategory(id, updates));
        resolve();
      });
    } else {
      return database
        .ref(`users/${uid}/categories/${id}`)
        .update(updates)
        .then(() => {
          dispatch(editCategory(id, updates));
        });
    }
  };
};
