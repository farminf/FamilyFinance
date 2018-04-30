import { firebase, googleAuthProvider } from "../firebase/firebase";
import { demoChageType } from "./demo";
import { resetError } from "./errors";

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
  return (dispatch, getState) => {
    const appState = getState().demoReducers.demotype;
    if (appState === "demo") {
      dispatch(demoChageType("logout"));
      dispatch(resetError());
      return dispatch(logout());
    } else {
      return firebase.auth().signOut();
    }
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
