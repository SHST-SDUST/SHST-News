import News from "./news";
import Publish from "./publish";
import { Routes, Route } from "react-router-dom";

const NewsRouter = (): JSX.Element => (
    <>
        <Routes>
            <Route path="/" element={<News />}></Route>
            <Route path="/publish" element={<Publish />}></Route>
        </Routes>
    </>
);

export default NewsRouter;
