import { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import Card from "src/components/card";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import Tabs from "./Tabs";
import { fetchNewsList, NewsItem } from "src/models/news/news";
import NewsListItem from "../components/news-list-item";
import Loading, { Props as LoadingProps } from "src/components/loading";

const NewsIndex: React.FC = () => {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState<LoadingProps["loading"]>("loadmore");
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [subActiveTabIndex, setSubActiveTabIndex] = useState(0);
    const [newsList, setNewsList] = useState<NewsItem[]>([]);

    useEffect(() => {
        loadNews(activeTabIndex, 1, subActiveTabIndex);
    }, []);

    const switchTab = (index: number, subIndex: number): void => {
        setNewsList([]);
        setActiveTabIndex(index);
        setSubActiveTabIndex(subIndex);
        loadNews(index, 1, subIndex);
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
            <div>
                {newsList.map(item => (
                    <Card
                        key={item.id}
                        className="a-mb-10"
                        content={<NewsListItem {...item} />}
                    ></Card>
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
