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
import { useRoutePath } from "src/utils/useRouter";

const NewsIndex: React.FC = () => {
    const nav = useRoutePath();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState<LoadingProps["loading"]>("loading");
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [subActiveTabIndex, setSubActiveTabIndex] = useState(0);
    const [newsList, setNewsList] = useState<NewsItem[]>([]);
    const [overheadList, setOverheadList] = useState<OverheadItem[]>([]);

    const switchTab = (index: number, subIndex: number, type: 1 | 2): void => {
        if (type === 1) subIndex = 0; // 点击的`Tab`是`1`级则重置`2`级标签
        setActiveTabIndex(index);
        setSubActiveTabIndex(subIndex);
    };

    useEffect(() => {
        setNewsList([]);
        setOverheadList([]);
        Promise.all([loadOverhead(activeTabIndex), loadNews(activeTabIndex, 1, subActiveTabIndex)]);
    }, [activeTabIndex, subActiveTabIndex]);

    const loadOverhead = async (index: number) => {
        const res = await fetchOverhead(index, false);
        setOverheadList(res.list);
    };

    const loadNews = async (type: number, page: number, subType: number) => {
        setLoading("loading");
        const res = await fetchNewsList(page, type, subType, false);
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
                        <Card
                            className="a-mb-10 a-color-grey border-radius-6"
                            content={<NewsListItem {...item} />}
                        ></Card>
                    </Link>
                ))}
            </div>
            <div
                onClick={() => nav("publish", true)}
                className={"a-x-center a-y-center " + styles["new-post-container"]}
            >
                <PlusOutlined style={{ fontSize: "20px" }} />
            </div>
            <Loading
                loading={loading}
                loadmore={() => loadNews(activeTabIndex, page + 1, subActiveTabIndex)}
            ></Loading>
        </div>
    );
};

export default NewsIndex;
