import { useState, useEffect } from "react";
import Card from "src/components/card";
import { Link } from "react-router-dom";
import NewsListItem from "../components/news-list-item";
import Loading, { Props as LoadingProps } from "src/components/loading";
import { fetchMyNewsList, MyNewsItem } from "src/models/news/user";
import BothEnds from "src/components/align/both-ends";
import { statusFilter } from "../common/filters";
import { Button } from "antd";

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
                    <Card
                        className="a-mb-10 a-color-grey border-radius-6"
                        content={
                            <>
                                <NewsListItem {...item} />
                                <div className="a-hr"></div>
                                <BothEnds left="当前状态" right={statusFilter(item.status)} />
                                <BothEnds left="审核信息" right={item.message} />
                                <BothEnds left="发布时间" right={item.create_time} />
                                <BothEnds
                                    right={
                                        <div className="y-center">
                                            <Link to={"/detail/" + item.id} key={item.id}>
                                                <Button size="small" type="primary">
                                                    查看帖子
                                                </Button>
                                            </Link>
                                            <Button type="primary" size="small" danger>
                                                删除帖子
                                            </Button>
                                        </div>
                                    }
                                />
                            </>
                        }
                    ></Card>
                ))}
            </div>
            <Loading loading={loading} loadmore={() => loadNews(page + 1)}></Loading>
        </div>
    );
};

export default NewsIndex;
