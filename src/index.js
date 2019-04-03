import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { firebase } from "./firebase/firebase";
import { history } from "./routers/AppRouter";
import { login, logout } from "./actions/auth";
import { setTransactions } from "./actions/transactions";
import { setAccounts } from "./actions/accounts";
import { setCategories } from "./actions/categories";
import configureStore from "./store/configureStore";
import "./firebase/firebase";
import LoadProgress from "./components/LoadProgress";
import { startSetTransactions } from "./actions/transactions";
import { startSetAccounts } from "./actions/accounts";
import { startSetCategories } from "./actions/categories";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById("root"));
    registerServiceWorker();
    hasRendered = true;
  }
};

ReactDOM.render(<LoadProgress />, document.getElementById("root"));

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(
      login({
        uid: user.uid,
        photoURL: user.photoURL,
        name: user.displayName,
        email: user.email
      })
    );
    store.dispatch(startSetTransactions()).then(() => {
      store.dispatch(startSetAccounts()).then(() => {
        store.dispatch(startSetCategories()).then(() => {
          renderApp();
          if (history.location.pathname === "/") {
            history.push("/dashboard");
          }
        });
      });
    });
  } else {
    store.dispatch(logout());
    store.dispatch(setAccounts([]));
    store.dispatch(setTransactions([]));
    store.dispatch(setCategories([]));

    renderApp();
    history.push("/");
  }
});
// TODO: obvious
if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
  // Additional state parameters can also be passed via URL.
  // This can be used to continue the user's intended action before triggering
  // the sign-in operation.
  // Get the email if available. This should be available if the user completes
  // the flow on the same device where they started it.
  var email = window.localStorage.getItem("emailForSignIn");
  if (!email) {
    // User opened the link on a different device. To prevent session fixation
    // attacks, ask the user to provide the associated email again. For example:
    email = window.prompt("Please provide your email for confirmation");
  }
  // The client SDK will parse the code from the link for you.
  firebase
    .auth()
    .signInWithEmailLink(email, window.location.href)
    .then(function(result) {
      // Clear email from storage.
      window.localStorage.removeItem("emailForSignIn");
      // You can access the new user via result.user
      // Additional user info profile not available via:
      // result.additionalUserInfo.profile == null
      // You can check if the user is new or existing:
      // result.additionalUserInfo.isNewUser
    })
    .catch(function(error) {
      // Some error occurred, you can inspect the code: error.code
      // Common errors could be invalid email and invalid or expired OTPs.
    });
}
