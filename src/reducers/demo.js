export default (state = { demotype: "logout" }, action) => {
  switch (action.type) {
    case "DEMO_CHANGE_TYPE":
      return {
        ...state,
        demotype: action.demotype
      };
    default:
      return state;
  }
};
