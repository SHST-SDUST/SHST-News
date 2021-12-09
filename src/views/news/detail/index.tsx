import { FC, useState, useEffect } from "react";
import styles from "./index.module.scss";
import { useParams } from "react-router-dom";
import { fetchNewsDetail, NewsDetail, ReviewItem } from "src/models/news/news";
import DetailItem from "../components/detail-item";
import { postLike } from "src/models/news/praise";
import { deleteReview } from "src/models/news/review";
import { confirm, toast } from "src/modules/toast";
import { data } from "src/modules/global-data";
import ReviewList from "../components/review-list";
import { Skeleton } from "antd";
import Card from "src/components/card";
import { formatDate } from "src/modules/datetime";
import { User } from "src/models/common/constant";
import { throttle } from "src/modules/operate-limit";

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
    const likeOperate = () => {
        if (data.user === 0) {
            toast("您处于游客状态，请在山科小站中操作");
            return void 0;
        }
        throttle(500, async () => {
            const toLike = !praised;
            const res = await postLike(Number(id), toLike);
            if (res.status === 1) {
                setPraised(toLike);
                setNewsDetail({
                    ...newsDetail,
                    praise: Number(newsDetail.praise) + (toLike ? 1 : -1),
                });
            }
        });
    };

    const newReviewHandler = (
        id: number,
        index: number,
        subIndex: number,
        user: User,
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
        if (index === -1 && subIndex === -1) {
            reviews.push(reviewInfo);
        } else if (index !== -1 && subIndex === -1) {
            reviewInfo.f_id = reviews[index].id;
            reviews[index].children.push(reviewInfo);
        } else if (index !== -1 && subIndex !== -1) {
            reviewInfo.f_id = reviews[index].id;
            reviewInfo.r_id = reviews[index].children[subIndex].id;
            reviews[index].children.push(reviewInfo);
        }
        setReviews(reviews);
    };

    const deleteReviewItem = async (reviewId: number, index: number, subIndex: number) => {
        const choice = await confirm("警告", "确定要删除评论吗?");
        if (!choice) return void 0;
        await deleteReview(Number(id), reviewId);
        if (index !== -1 && subIndex === -1) {
            reviews.splice(index, 1);
        } else if (index !== -1 && subIndex !== -1) {
            reviews[index].children.splice(subIndex, 1);
        }
        setReviews([...reviews]);
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
                        deleteReviewItem={deleteReviewItem}
                    />
                </div>
            )}
        </>
    );
};

export default Detail;
