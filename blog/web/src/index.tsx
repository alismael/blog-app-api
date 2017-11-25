import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";

const app = document.getElementById('app')

ReactDOM.render(
    <Hello username="Typescript" />,
    app
);