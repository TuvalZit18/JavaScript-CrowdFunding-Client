//External Imports
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { ThemeProvider } from "theme-ui";
import { Global } from "@emotion/react";
import { Provider } from "react-redux";
//=================================================================
//Internal Imports
import App from "./App";
import theme from "./common/theme";
import { StateContextProvider } from "./context";
import store from "./redux/store";
//=================================================================
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThirdwebProvider desiredChainId={ChainId.Goerli}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Global
          styles={() => ({
            body: {
              overflowY: "visible !important",
              margin: 0,
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
              height: "100%",
            },
          })}
        />
        <StateContextProvider>
          <App />
        </StateContextProvider>
      </ThemeProvider>
    </Provider>
  </ThirdwebProvider>
);
