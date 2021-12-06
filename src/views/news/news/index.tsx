import { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import Card from "src/components/card";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import Tabs from "./tabs";
import { fetchNewsList, fetchOverhead, NewsItem, OverheadItem } from "src/models/news/news";
import NewsListItem from "../components/news-list-item";
import Loading, { Props as LoadingProps } from "src/components/loading";
import Overhead from "./overhead";

const NewsIndex: React.FC = () => {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState<LoadingProps["loading"]>("loadmore");
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [subActiveTabIndex, setSubActiveTabIndex] = useState(0);
    const [newsList, setNewsList] = useState<NewsItem[]>([]);
    const [overheadList, setOverheadList] = useState<OverheadItem[]>([]);

    useEffect(() => {
        loadOverhead(activeTabIndex);
        loadNews(activeTabIndex, 1, subActiveTabIndex);
    }, []);

    const switchTab = (index: number, subIndex: number, type: 1 | 2): void => {
        if (type === 1) subIndex = 0; // 点击的`Tab`是`1`级则重置`2`级标签
        setNewsList([]);
        setOverheadList([]);
        setActiveTabIndex(index);
        setSubActiveTabIndex(subIndex);
        loadNews(index, 1, subIndex);
        loadOverhead(index);
    };

    const loadOverhead = async (index: number) => {
        const res = await fetchOverhead(index);
        setOverheadList(res.list);
    };

    const loadNews = async (type: number, page: number, subType: number) => {
        const res = await fetchNewsList(page, type, subType);
        setPage(page);
        setNewsList(newsList => newsList.concat(res.list));
        if (res.list.length < 10) setLoading("nomore");
        else setLoading("loadmore");
    };

    return (
        <div className="padding-page">
            <Tabs
                activeTabIndex={activeTabIndex}
                switchTab={switchTab}
                subActiveTabIndex={subActiveTabIndex}
            ></Tabs>
            {overheadList.length > 0 && (
                <Card className="a-lmb" content={<Overhead overheadList={overheadList} />} />
            )}
            <div>
                {newsList.map(item => (
                    <Link to={"/detail/" + item.id} key={item.id}>
                        <Card className="a-mb-10" content={<NewsListItem {...item} />}></Card>
                    </Link>
                ))}
            </div>
            <Link to="publish" className={"a-x-center a-y-center " + styles["new-post-container"]}>
                <PlusOutlined style={{ fontSize: "20px" }} />
            </Link>
            <Loading
                loading={loading}
                loadmore={() => loadNews(activeTabIndex, page + 1, subActiveTabIndex)}
            ></Loading>
        </div>
    );
};

export default NewsIndex;
