import { FC } from "react";
import { Button } from "antd";
import "./App.css";
import loading from "src/modules/loading";
import "./vector/styles/asse.scss";
import "./vector/styles/asse-style.scss";

const runLoading = () => {
    loading.start();
    console.log(333);
    setTimeout(loading.end, 3000);
};
const App: FC = () => (
    <div className="App">
        <Button type="primary" onClick={runLoading}>
            Button
        </Button>
    </div>
);

export default App;
