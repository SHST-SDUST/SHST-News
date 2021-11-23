import News from "./news";
import Publish from "./publish";
import { Routes, Route, Link } from "react-router-dom";

const NewsRouter = (): JSX.Element => (
    <>
        <Link to="/">首页</Link>
        <Link to="/publish">详情页</Link>
        <Routes>
            <Route path="/" element={<News />}></Route>
            <Route path="/publish" element={<Publish />}></Route>
        </Routes>
    </>
);

export default NewsRouter;
