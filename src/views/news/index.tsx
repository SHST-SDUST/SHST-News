import News from "./news";
import Publish from "./publish";
import { Routes, Route } from "react-router-dom";
import NotFound from "../system/NotFound";
import MyNewsList from "./mine/news";
import Detail from "./detail";

const NewsRouter = (): JSX.Element => (
    <>
        <Routes>
            <Route path="/" element={<News />}></Route>
            <Route path="/detail/:id" element={<Detail />}></Route>
            <Route path="/publish" element={<Publish />}></Route>
            <Route path="/mine/news" element={<MyNewsList />}></Route>
            <Route path="*" element={<NotFound />}></Route>
        </Routes>
    </>
);

export default NewsRouter;
