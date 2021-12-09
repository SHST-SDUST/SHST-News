import News from "./news";
import Publish from "./publish";
import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "../system/NotFound";
import MyNewsList from "./mine/news";
import Detail from "./detail";
import { AliveScope, KeepAlive } from "react-activation";
import { useState, useEffect } from "react";
import eventBus from "src/modules/event-bus";
import Notice from "./mine/notice";
import storage from "src/modules/storage";

const NewsRouter = (): JSX.Element => {
    const [userStatus, setUserStatus] = useState(Number(storage("s").get("user-login") || 0));
    const RedirectIndex = <Navigate replace={true} to="/" />;

    useEffect(() => {
        const setUserStatusEvent = (status: number) => setUserStatus(status);
        eventBus.on("user-login", setUserStatusEvent);
        return () => {
            eventBus.off("user-login", setUserStatusEvent);
        };
    }, []);

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
                {userStatus ? (
                    <>
                        <Route path="/publish" element={<Publish />}></Route>
                        <Route path="/mine/news" element={<MyNewsList />}></Route>
                        <Route path="/mine/notice" element={<Notice />}></Route>
                    </>
                ) : (
                    <>
                        <Route path="/publish" element={RedirectIndex}></Route>
                        <Route path="/mine/news" element={RedirectIndex}></Route>
                        <Route path="/mine/notice" element={RedirectIndex}></Route>
                    </>
                )}
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </AliveScope>
    );
};

export default NewsRouter;
