import ReactDOM from "react-dom";
import App from "./App";
import "src/App.css";
import "src/vector/styles/asse.scss";
import "src/vector/styles/asse-style.scss";
import { initApp } from "src/vector/launch";

initApp();

ReactDOM.render(<App />, document.getElementById("root"));
