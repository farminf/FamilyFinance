export default (state = {}, action) => {
  switch (action.type) {
    case "ADD_CATEGORIES":
      return [...state, action.category];
    case "UPDATE_CATEGORIES":
      return state.map(category => {
        if (category.id === action.id) {
          return {
            ...category,
            ...action.updates
          };
        } else {
          return category;
        }
      });
    case "DELETE_CATEGORIES":
      return state.filter(({ id }) => id !== action.id);
    case "SET_CATEGORIES":
      return action.categories;
    default:
      return state;
  }
};
