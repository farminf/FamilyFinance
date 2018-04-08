export default(state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        "uid": action.uid,
        "photoURL" : action.photoURL,
        "name" : action.name,
        "email" : action.email
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
