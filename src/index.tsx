import ReactDOM from "react-dom";
import App from "./App";
import { initApp } from "src/vector/launch";

initApp();

ReactDOM.render(<App />, document.getElementById("root"));
