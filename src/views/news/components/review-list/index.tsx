import { FC, useState } from "react";
import { ReviewItem } from "src/models/news/news";
import styles from "./index.module.scss";
import { Modal, Input, ModalProps, Empty } from "antd";
import Card from "src/components/card";
import { toast } from "src/modules/toast";
import { postReview } from "src/models/news/publish";
import { updateUserInfo } from "src/utils/mini-program";
interface Props {
    reviews: ReviewItem[];
    className?: string;
    newReviewHandler: (
        id: number,
        index: number,
        user: { nick_name: string; avatar_url: string },
        comment: string,
        series: number
    ) => void;
    id: number;
}

const ReviewList: FC<Props> = props => {
    const [showInput, setShowInput] = useState(false);
    const [inputText, setInputText] = useState("");
    const [replyIndex, setReplyIndex] = useState(-1);

    const confirmModal: ModalProps["onOk"] = async () => {
        if (!inputText) {
            toast("请输入内容");
            return void 0;
        }
        if (inputText.length >= 100) {
            toast("评论内容不能大于100字");
            return void 0;
        }
        const rId = replyIndex === -1 ? 0 : props.reviews[replyIndex].id;
        const res = await postReview(props.id, rId, inputText);
        if (res.update) {
            updateUserInfo();
            return void 0;
        }
        if (res.audit) {
            toast("您的评论在审核中，请等待审核");
        } else {
            props.newReviewHandler(res.id, replyIndex, res.user, inputText, res.series);
        }
        setShowInput(false);
        setInputText("");
    };
    const cancelModal: ModalProps["onCancel"] = () => {
        setShowInput(false);
        setInputText("");
    };

    const startReview = (index: number) => {
        setReplyIndex(index);
        setShowInput(true);
    };

    return (
        <>
            <Card
                className={props.className}
                content={
                    <>
                        <div className="a-y-center a-flex-space-between a-pt a-pb">
                            <div>全部评论</div>
                            <div className="a-color-blue" onClick={() => startReview(-1)}>
                                写评论
                            </div>
                        </div>
                        <div className="a-hr"></div>
                        {props.reviews.map(item => (
                            <div key={item.id}>
                                <div>{item.review}</div>
                                <div className="a-hr"></div>
                            </div>
                        ))}
                        {props.reviews.length === 0 && (
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="快来抢沙发" />
                        )}
                    </>
                }
            />
            <Modal title="写评论" visible={showInput} onOk={confirmModal} onCancel={cancelModal}>
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
