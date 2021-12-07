import { FC, useState, useEffect } from "react";
import styles from "./index.module.scss";
import { useParams } from "react-router-dom";
import { fetchNewsDetail, NewsDetail } from "src/models/news/news";
import DetailItem from "../components/detail-item";
import { postLike } from "src/models/news/publish";
import { toast } from "src/modules/toast";
import { data } from "src/modules/global-data";

const Detail: FC = () => {
    const { id } = useParams();
    const [newsDetail, setNewsDetail] = useState<Partial<NewsDetail>>({});
    const [praised, setPraised] = useState<boolean>(false);

    useEffect(() => {
        getNewsDetail();
    }, []);

    const getNewsDetail = async () => {
        const res = await fetchNewsDetail(Number(id));
        setNewsDetail(res.detail);
        setPraised(res.praised);
    };
    const likeOperate = async () => {
        if (data.user === 0) {
            toast("您处于游客状态，请在山科小站中操作");
            return void 0;
        }
        const toLike = !praised;
        const res = await postLike(toLike);
        if (res.status === 1) {
            setPraised(toLike);
            setNewsDetail({
                ...newsDetail,
                praise: Number(newsDetail.praise) + (toLike ? 1 : -1),
            });
        }
    };
    return (
        <div>
            <DetailItem {...newsDetail} praised={praised} likeOperate={likeOperate} />
        </div>
    );
};

export default Detail;
