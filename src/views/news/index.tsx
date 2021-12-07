import News from "./news";
import Publish from "./publish";
import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "../system/NotFound";
import MyNewsList from "./mine/news";
import Detail from "./detail";
import { data } from "src/modules/global-data";
import { AliveScope, KeepAlive } from "react-activation";

const NewsRouter = (): JSX.Element => {
    const getUserStatus = () => data.user; // 未使用状态管理 直接检测守卫
    const RedirectIndex = <Navigate replace={true} to="/" />;
    return (
        <AliveScope>
            <Routes>
                <Route
                    path="/"
                    element={
                        <KeepAlive name="news-index">
                            <News />
                        </KeepAlive>
                    }
                ></Route>
                <Route path="/detail/:id" element={<Detail />}></Route>
                {getUserStatus() ? (
                    <>
                        <Route path="/publish" element={<Publish />}></Route>
                        <Route path="/mine/news" element={<MyNewsList />}></Route>
                    </>
                ) : (
                    <>
                        <Route path="/publish" element={RedirectIndex}></Route>
                        <Route path="/mine/news" element={RedirectIndex}></Route>
                    </>
                )}
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </AliveScope>
    );
};

export default NewsRouter;
