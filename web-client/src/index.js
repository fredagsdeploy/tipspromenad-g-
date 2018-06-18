import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { injectGlobal } from "styled-components";

injectGlobal`
    html, body, #root {
        height: 100%;
    } 
    #root {
        display: flex;
        flex-direction: column;
        flex: 1;
    }
`;

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
