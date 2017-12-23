export default(state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        "uid": action.uid,
        "photoURL" : action.photoURL
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
