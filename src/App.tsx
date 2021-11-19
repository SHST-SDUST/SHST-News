import { FC } from "react";
import { Button } from "antd";
import "./App.css";
import { start, end } from "src/modules/loading";
import "./vector/styles/asse.scss";
import "./vector/styles/asse-style.scss";

const runLoading = () => {
    start();
    console.log(1111);
    setTimeout(end, 3000);
};
const App: FC = () => (
    <div className="App">
        <Button type="primary" onClick={runLoading}>
            Button
        </Button>
    </div>
);

export default App;
