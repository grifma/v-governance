import "core-js/stable";
import "regenerator-runtime/runtime";

import React from "react";
import ReactDOM from "react-dom";
import { AragonApi } from "@aragon/api-react";
import App from "./App";

const reducer = (state) => {
  if (state === null) {
    return {
      count: 0,
      isSyncing: true,
      governedContractAddress: "0x0D13999edC23D3475Ed3FE22a15Cc7828FeCD762",
      name: "Name Not Set",
      totalSupply: 0,
    };
  }
  return state;
};

ReactDOM.render(
  <AragonApi reducer={reducer}>
    <App />
  </AragonApi>,
  document.getElementById("root")
);
