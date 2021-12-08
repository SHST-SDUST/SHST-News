import { useState, useEffect } from "react";
import Card from "src/components/card";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import NewsListItem from "../components/news-list-item";
import Loading, { Props as LoadingProps } from "src/components/loading";
import { fetchMyNewsList, MyNewsItem } from "src/models/news/user";

const NewsIndex: React.FC = () => {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState<LoadingProps["loading"]>("loadmore");
    const [newsList, setNewsList] = useState<MyNewsItem[]>([]);

    useEffect(() => {
        loadNews(1);
    }, []);

    const loadNews = async (page: number) => {
        const res = await fetchMyNewsList(page);
        setPage(page);
        setNewsList(newsList => newsList.concat(res.list));
        if (res.list.length < 10) setLoading("nomore");
        else setLoading("loadmore");
    };

    return (
        <div className="padding-page">
            <div>
                {newsList.map(item => (
                    <Link to={"/detail/" + item.id} key={item.id}>
                        <Card
                            className="a-mb-10 a-color-grey border-radius-6"
                            content={
                                <>
                                    <NewsListItem {...item} />
                                    <div className="a-hr"></div>
                                </>
                            }
                        ></Card>
                    </Link>
                ))}
            </div>
            <Loading loading={loading} loadmore={() => loadNews(page + 1)}></Loading>
        </div>
    );
};

export default NewsIndex;
