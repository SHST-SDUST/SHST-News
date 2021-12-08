import { FC, useState, useEffect } from "react";
import styles from "./index.module.scss";
import { useParams } from "react-router-dom";
import { fetchNewsDetail, NewsDetail, ReviewItem } from "src/models/news/news";
import DetailItem from "../components/detail-item";
import { postLike } from "src/models/news/publish";
import { toast } from "src/modules/toast";
import { data } from "src/modules/global-data";
import ReviewList from "../components/review-list";
import { Skeleton } from "antd";
import Card from "src/components/card";
import { formatDate } from "src/modules/datetime";

const Detail: FC = () => {
    const { id } = useParams();
    const [newsDetail, setNewsDetail] = useState<Partial<NewsDetail>>({});
    const [praised, setPraised] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [reviews, setReviews] = useState<ReviewItem[]>([]);
    const [reviewIdNameMap, setReviewIdNameMap] = useState<Record<string, string>>({});

    useEffect(() => {
        getNewsDetail();
    }, []);

    const getNewsDetail = async () => {
        const res = await fetchNewsDetail(Number(id));
        setNewsDetail(res.detail);
        setPraised(res.praised);
        setLoading(false);
        setReviews(res.reviews);
        setReviewIdNameMap(res.reviewIdNameMap);
    };
    const likeOperate = async () => {
        if (data.user === 0) {
            toast("您处于游客状态，请在山科小站中操作");
            return void 0;
        }
        const toLike = !praised;
        const res = await postLike(Number(id), toLike);
        if (res.status === 1) {
            setPraised(toLike);
            setNewsDetail({
                ...newsDetail,
                praise: Number(newsDetail.praise) + (toLike ? 1 : -1),
            });
        }
    };

    const newReviewHandler = (
        id: number,
        index: number,
        replySubIndex: number,
        user: { nick_name: string; avatar_url: string },
        comment: string,
        series: number
    ) => {
        newsDetail.review = Number(newsDetail.review) + 1;
        setNewsDetail(newsDetail);
        const reviewInfo: ReviewItem = {
            id: id,
            nick_name: user.nick_name,
            user_type: 0,
            avatar_url: user.avatar_url,
            review: comment,
            series: series,
            mine: true,
            f_id: 0,
            r_id: 0,
            children: [],
            review_time: formatDate("yyyy-MM-dd hh:mm:ss"),
        };
        if (index === -1 && replySubIndex === -1) {
            reviews.push(reviewInfo);
        } else if (index !== -1 && replySubIndex === -1) {
            reviewInfo.f_id = reviews[index].id;
            reviews[index].children.push(reviewInfo);
        } else if (index !== -1 && replySubIndex !== -1) {
            reviewInfo.f_id = reviews[index].id;
            reviewInfo.r_id = reviews[index].children[replySubIndex].id;
            reviews[index].children.push(reviewInfo);
        }
        setReviews(reviews);
    };
    return (
        <>
            {loading ? (
                <Card content={<Skeleton active avatar paragraph={{ rows: 6 }} />} />
            ) : (
                <div>
                    <DetailItem
                        {...newsDetail}
                        praised={praised}
                        likeOperate={likeOperate}
                        id={Number(id)}
                    />
                    <ReviewList
                        reviews={reviews}
                        className="a-mt-15"
                        newReviewHandler={newReviewHandler}
                        id={Number(id)}
                        reviewIdNameMap={reviewIdNameMap}
                    />
                </div>
            )}
        </>
    );
};

export default Detail;
