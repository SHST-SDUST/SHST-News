import { FC } from "react";
import { NewsDetail } from "src/models/news/news";
import styles from "./index.module.scss";
import publishStyles from "../../publish/index.module.scss";
import { Tag, Image } from "antd";
import { MessageOutlined, HeartOutlined, EyeOutlined, HeartFilled } from "@ant-design/icons";
import { typeFilter } from "../../common/filters";
import { report } from "src/utils/feedback";
interface Props {
    id: number;
    praised: boolean;
    likeOperate: () => void;
    ext?: JSX.Element;
}

const IMAGE_LENGTH = 3;

const DetailItem: FC<Props & Partial<NewsDetail>> = props => (
    <div className="a-background-white padding-page a-pt-15">
        <div className="a-flex-space-between">
            <div className="a-y-center">
                <img className={styles.avatar + " a-mr-6"} src={props.avatar_url} alt="" />
                <div>{props.nick_name}</div>
            </div>
            <div
                className="a-link"
                onClick={() => report(props.id, "post", props.content || "Error")}
            >
                举报
            </div>
        </div>
        <div className="a-mt-8 a-fontsize-12">{props.create_time}</div>
        <div className="a-lmt">{props.content}</div>
        {props.host && (
            <div className="a-y-center a-flex-space-between a-mt-8">
                <>
                    {props.imgs?.map((path, index) => (
                        <div
                            key={index}
                            className={"a-flex-space-around " + publishStyles.image_container}
                        >
                            <Image
                                src={props.host + "public/upload/" + path}
                                wrapperClassName="a-x-center"
                                alt=""
                            />
                        </div>
                    ))}
                </>
                {IMAGE_LENGTH - Number(props.imgs?.length) > 0 &&
                    Array(IMAGE_LENGTH - Number(props.imgs?.length))
                        .fill(null)
                        .map((_, index) => (
                            <div
                                key={index}
                                className={"a-mt-8 " + publishStyles.image_container_hide}
                            ></div>
                        ))}
            </div>
        )}

        <div className="a-y-center a-flex-space-between a-lmt">
            <Tag color="processing"># {typeFilter(Number(props.type))}</Tag>
            <div>
                <span className="a-lmr a-color-blue">
                    <EyeOutlined className="a-mr-3 " />
                    <span>{props.look_over}</span>
                </span>
                <span className="a-lmr a-color-orange" onClick={props.likeOperate}>
                    {props.praised ? (
                        <HeartFilled className="a-mr-3 " />
                    ) : (
                        <HeartOutlined className="a-mr-3 " />
                    )}
                    <span>{props.praise}</span>
                </span>
                <span className="a-lmr a-color-green-light">
                    <MessageOutlined className="a-mr-3 " />
                    <span>{props.review}</span>
                </span>
            </div>
        </div>
    </div>
);

DetailItem.defaultProps = {};

export default DetailItem;
