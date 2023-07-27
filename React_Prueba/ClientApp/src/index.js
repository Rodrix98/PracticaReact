import React from "react";
import ReactDom from "react-dom/client";

import App from "./App"

//vamos a crear un root / elemento raiz donde deseamos que se renderize/pinte nuestro componenetes

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
    <App />

)
    
