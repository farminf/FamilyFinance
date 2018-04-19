import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "../App";
import configureStore from "../store/configureStore";
const store = configureStore();

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(jsx, div);
});
