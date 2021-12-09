import { useState, useEffect } from "react";
import Card from "src/components/card";
import { Link } from "react-router-dom";
import NewsListItem from "../components/news-list-item";
import Loading, { Props as LoadingProps } from "src/components/loading";
import { fetchMyNewsList, MyNewsItem } from "src/models/news/user";
import BothEnds from "src/components/align/both-ends";
import { statusFilter } from "../common/filters";
import { Button } from "antd";
import { deleteNews } from "src/models/news/post";
import { throttle } from "src/modules/operate-limit";
import { confirm, toast } from "src/modules/toast";

const NewsIndex: React.FC = () => {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState<LoadingProps["loading"]>("loading");
    const [newsList, setNewsList] = useState<MyNewsItem[]>([]);

    useEffect(() => {
        loadNews(1);
    }, []);

    const loadNews = async (page: number) => {
        setLoading("loading");
        const res = await fetchMyNewsList(page);
        setPage(page);
        setNewsList(newsList => newsList.concat(res.list));
        if (res.list.length < 10) setLoading("nomore");
        else setLoading("loadmore");
    };

    const deletePost = (id: number, index: number) => {
        throttle(500, async () => {
            const choice = await confirm("警告", "确定删除帖子吗？");
            if (choice) {
                const res = await deleteNews(id);
                if (res.status === 1) {
                    toast("删除成功");
                    newsList.splice(index, 1);
                    setNewsList([...newsList]);
                }
            }
        });
    };

    return (
        <div className="padding-page">
            <div>
                {newsList.map((item, index) => (
                    <Card
                        key={item.id}
                        className="a-mb-10 a-color-grey border-radius-6"
                        content={
                            <>
                                <NewsListItem {...item} />
                                <div className="a-hr"></div>
                                <BothEnds
                                    className="a-mt"
                                    left="当前状态"
                                    right={statusFilter(item.status)}
                                />
                                <BothEnds className="a-mt" left="审核信息" right={item.message} />
                                <BothEnds
                                    className="a-mt"
                                    left="发布时间"
                                    right={item.create_time}
                                />
                                <div className="a-hr"></div>
                                <BothEnds
                                    className="a-mt"
                                    right={
                                        <div className="y-center">
                                            <Link to={"/detail/" + item.id} key={item.id}>
                                                <Button type="primary" size="small">
                                                    查看帖子
                                                </Button>
                                            </Link>
                                            <Button
                                                className="a-lml"
                                                type="primary"
                                                size="small"
                                                danger
                                                onClick={() => deletePost(item.id, index)}
                                            >
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
