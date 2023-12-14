import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
//import AppRouter from "./AppRouter";

import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAzfA3yselV49UYZG72tqRPpRKrlb2RDgY",
  authDomain: "zbcommunityprac1.firebaseapp.com",
  projectId: "zbcommunityprac1",
  storageBucket: "zbcommunityprac1.appspot.com",
  messagingSenderId: "89691516872",
  appId: "1:89691516872:web:0ecc89244d18d0e2c51afd",
  measurementId: "G-1DMQGH12DH",
};
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="container">
    <App />
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
