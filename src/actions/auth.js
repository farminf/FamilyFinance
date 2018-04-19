import { firebase, googleAuthProvider } from "../firebase/firebase";

export const login = ({
  uid = "",
  photoURL = "",
  name = "",
  email = ""
} = {}) => ({ type: "LOGIN", uid, photoURL, name, email });

export const startLoginGoogle = () => {
  return () => {
    //return firebase.auth().signInWithRedirect(googleAuthProvider);
    return firebase.auth().signInWithRedirect(googleAuthProvider);
  };
};

export const logout = () => ({ type: "LOGOUT" });

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};

export const startSignUp = (email, password) => {
  return () => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + " " + errorMessage);
      });
  };
};

export const startLoginWithEmail = (email, password) => {
  return () => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + " " + errorMessage);
      });
  };
};
