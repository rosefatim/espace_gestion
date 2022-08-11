
import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./store/reducer";
import secureLocalStorage from "react-secure-storage";


function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    secureLocalStorage.setItem("state", serializedState);
  } catch (err) {
    console.log(err);
  }
}

export function loadFromLocalStorage() {
  try {
    const serializedState = secureLocalStorage.getItem("state");
    if (serializedState == null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

const persistState = loadFromLocalStorage();

const store = createStore(
  rootReducer,
  persistState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => saveToLocalStorage(store.getState()));

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

reportWebVitals();
