import database from "../firebase/firebase";
import { addError } from "./errors";

export const addCategory = category => ({ type: "ADD_CATEGORIES", category });

export const startAddCategory = (categoryData = {}) => {
  return (dispatch, getState) => {
    const user_uid = getState().auth.uid;
    const { name = "default" } = categoryData;
    const category = {
      name
    };

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
  };
};

export const setCategories = categories => ({
  type: "SET_CATEGORIES",
  categories
});

export const startSetCategories = () => {
  return (dispatch, getState) => {
    const user_uid = getState().auth.uid;
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
  };
};

export const deleteCategory = ({ id } = {}) => ({
  type: "DELETE_CATEGORIES",
  id
});

export const startDeleteCategory = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/categories/${id}`)
      .remove()
      .then(() => {
        dispatch(deleteCategory({ id }));
      });
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
    return database
      .ref(`users/${uid}/categories/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editCategory(id, updates));
      });
  };
};
