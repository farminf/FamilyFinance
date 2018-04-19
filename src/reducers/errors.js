export default (state = {}, action) => {
  switch (action.type) {
    case "ADD_ERROR":
      return [...state, action.error];
    case "RESET_ERROR":
      return {};
    default:
      return state;
  }
};
