import { FC } from "react";
import NewsRouter from "src/views/news";
import { HashRouter, Routes, Route } from "react-router-dom";
import "src/App.css";
import "src/vector/styles/asse.scss";
import "src/vector/styles/asse-style.scss";
import { Row, Col } from "antd";

const App: FC = () => (
    <Row justify="center">
        <Col xs={24} sm={14} md={10} lg={8} xl={6} className="position-relative">
            <HashRouter>
                <Routes>
                    <Route path="/*" element={<NewsRouter />}></Route>
                </Routes>
            </HashRouter>
        </Col>
    </Row>
);

export default App;
