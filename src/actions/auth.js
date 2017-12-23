import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = ({uid = '' , photoURL = ''} = {}) => ({
  type: 'LOGIN',
  uid : uid,
  photoURL : photoURL
});

export const startLogin = () => {
  return () => {
    //return firebase.auth().signInWithRedirect(googleAuthProvider);
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};