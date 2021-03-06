//Import Tools
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

//Redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import Thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import Reducers from "./redux/reducers";

//Style
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./index.css";
import "typeface-roboto";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

const store = createStore(
  Reducers,
  composeWithDevTools(applyMiddleware(Thunk))
  // {},
  // applyMiddleware(Thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
