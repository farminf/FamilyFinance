export default (state = {}, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return [...state, action.transaction];
    case "UPDATE_TRANSACTION":
      // loop over state which contains all transaction items
      // if it finds the same id, update it, if no return state
      return state.map(transaction => {
        if (transaction.id === action.id) {
          return {
            ...transaction,
            ...action.updates
          };
        } else {
          return transaction;
        }
      });
    case "DELETE_TRANSACTION":
      return state.filter(({ id }) => id !== action.id);
    case "SET_TRANSACTIONS":
      return action.transactions;
    default:
      return state;
  }
};
