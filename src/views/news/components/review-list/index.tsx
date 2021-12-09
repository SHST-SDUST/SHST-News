import { FC, useState } from "react";
import { ReviewItem } from "src/models/news/news";
import styles from "./index.module.scss";
import { Modal, Input, ModalProps, Empty } from "antd";
import Card from "src/components/card";
import { toast } from "src/modules/toast";
import { postReview } from "src/models/news/review";
import { updateUserInfo } from "src/utils/mini-program";
import { report } from "src/utils/feedback";
import { data } from "src/modules/global-data";
import { User } from "src/models/common/constant";
interface Props {
    reviews: ReviewItem[];
    className?: string;
    newReviewHandler: (
        id: number,
        index: number,
        replySubIndex: number,
        user: User,
        comment: string,
        series: number
    ) => void;
    id: number;
    reviewIdNameMap: Record<string, string>;
    deleteReviewItem: (reviewId: number, index: number, subIndex: number) => void;
}

const ReviewList: FC<Props> = props => {
    const [showInput, setShowInput] = useState(false);
    const [inputText, setInputText] = useState("");
    const [replyIndex, setReplyIndex] = useState(-1);
    const [replySubIndex, setReplySubIndex] = useState(-1);

    const confirmModal: ModalProps["onOk"] = async () => {
        if (!inputText) {
            toast("请输入内容");
            return void 0;
        }
        if (inputText.length >= 100) {
            toast("评论内容不能大于100字");
            return void 0;
        }
        const fId = replyIndex === -1 ? 0 : props.reviews[replyIndex].id;
        const rId = replySubIndex === -1 ? 0 : props.reviews[replyIndex].children[replySubIndex].id;
        const res = await postReview(props.id, fId, rId, inputText);
        if (res.update) {
            updateUserInfo();
            return void 0;
        }
        if (res.audit) {
            toast("您的评论在审核中，请等待审核");
        } else {
            props.newReviewHandler(
                res.id,
                replyIndex,
                replySubIndex,
                res.user,
                inputText,
                res.series
            );
        }
        setShowInput(false);
        setInputText("");
    };
    const cancelModal: ModalProps["onCancel"] = () => {
        setShowInput(false);
        setInputText("");
    };

    const startReview = (index: number, subIndex: number) => {
        if (data.user === 0) {
            toast("您处于游客状态，请在山科小站中操作");
            return void 0;
        }
        setReplyIndex(index);
        setReplySubIndex(subIndex);
        setShowInput(true);
    };

    const ReviewBlock = (item: Omit<ReviewItem, "children">, index: number, subIndex = -1) => (
        <>
            <div className="a-y-center a-flex-space-between a-mt-8">
                <div className="a-y-center">
                    <img className={styles.avatar + " a-mr-6"} src={item.avatar_url} alt="" />
                    <div>{item.nick_name}</div>
                </div>
                <div>#{item.series}</div>
            </div>
            <div className="a-lmt a-ml">
                {item.r_id === 0 ? (
                    item.review
                ) : (
                    <>
                        <span className="a-color-blue">
                            @ {props.reviewIdNameMap[item.r_id] || "已删除"} :
                        </span>
                        <span>{item.review}</span>
                    </>
                )}
            </div>
            <div className="a-flex-space-between a-lmt a-ml">
                <div>{item.review_time}</div>
                <div className="a-link a-y-center">
                    <div className="a-lml" onClick={() => startReview(index, subIndex)}>
                        回复
                    </div>
                    {item.mine ? (
                        <div
                            className="a-lml"
                            onClick={() => props.deleteReviewItem(item.id, index, subIndex)}
                        >
                            删除
                        </div>
                    ) : (
                        <div
                            className="a-lml"
                            onClick={() => report(item.id, "review", item.review)}
                        >
                            举报
                        </div>
                    )}
                </div>
            </div>
        </>
    );

    return (
        <>
            <Card
                className={props.className}
                content={
                    <>
                        <div className="a-y-center a-flex-space-between a-pt a-pb">
                            <div>全部评论</div>
                            <div className="a-link" onClick={() => startReview(-1, -1)}>
                                写评论
                            </div>
                        </div>
                        <div className="a-hr"></div>
                        {props.reviews.map((item, index) => (
                            <div key={item.id}>
                                {ReviewBlock(item, index)}
                                {item.children.map((subItem, subIndex) => (
                                    <div
                                        key={subItem.id}
                                        className={
                                            "a-lml a-background-grey a-mt border-radius-6 " +
                                            styles.padding_block
                                        }
                                    >
                                        {ReviewBlock(subItem, index, subIndex)}
                                    </div>
                                ))}
                                <div className="a-hr"></div>
                            </div>
                        ))}
                        {props.reviews.length === 0 && (
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="快来抢沙发" />
                        )}
                    </>
                }
            />
            <Modal
                title={replyIndex === -1 ? "写评论" : "回复"}
                visible={showInput}
                onOk={confirmModal}
                onCancel={cancelModal}
            >
                <Input
                    maxLength={100}
                    value={inputText}
                    onChange={event => setInputText(event.target.value)}
                    allowClear
                />
            </Modal>
        </>
    );
};

ReviewList.defaultProps = {};

export default ReviewList;
