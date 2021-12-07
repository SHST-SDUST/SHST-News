import { FC, useState, useEffect } from "react";
import styles from "./index.module.scss";
import { useParams } from "react-router-dom";
import { fetchNewsDetail, NewsDetail } from "src/models/news/news";
import DetailItem from "../components/detail-item";

const Detail: FC = () => {
    const { id } = useParams();
    const [newsDetail, setNewsDetail] = useState<Partial<NewsDetail>>({});

    useEffect(() => {
        getNewsDetail();
    }, []);

    const getNewsDetail = async () => {
        const res = await fetchNewsDetail(Number(id));
        setNewsDetail(res.detail);
    };
    return (
        <div>
            <DetailItem {...newsDetail} />
        </div>
    );
};

export default Detail;
