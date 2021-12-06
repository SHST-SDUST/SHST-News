import { FC, useState } from "react";
import styles from "./index.module.scss";
import { useParams } from "react-router-dom";
import { NewsDetail } from "src/models/news/news";

const Detail: FC = () => {
    const [newsDetail, setNewsDetail] = useState<Partial<NewsDetail>>({});
    const { id } = useParams();
    console.log(id);
    return <div className={styles.example}></div>;
};

export default Detail;
