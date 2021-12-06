import { FC } from "react";
import { NewsItem } from "src/models/news/news";
import { typeFilter } from "../../common/filters";
import styles from "./index.module.scss";
import { Tag } from "antd";
import { MessageOutlined, HeartOutlined, EyeOutlined } from "@ant-design/icons";

const NewsListItem: FC<NewsItem> = props => (
    <>
        <div className="a-y-center">
            <img className={styles.avatar + " a-mr-6"} src={props.avatar_url} alt="" />
            <div>{props.nick_name}</div>
        </div>
        <div className="a-mt-8">{props.content}</div>
        {props.host && (
            <div className="a-y-center a-mt-8">
                <div className={"a-x-center " + styles.image_container}>
                    <img src={props.host + "public/upload/" + props.imgs[0]} alt="" />
                </div>
            </div>
        )}

        <div className="a-y-center a-flex-space-between a-mt-8">
            <Tag color="processing"># {typeFilter(props.type)}</Tag>
            <div>
                <span className="a-lmr a-color-blue">
                    <EyeOutlined className="a-mr-3 " />
                    <span>{props.look_over}</span>
                </span>
                <span className="a-lmr a-color-orange">
                    <HeartOutlined className="a-mr-3 " />
                    <span>{props.praise}</span>
                </span>
                <span className="a-lmr a-color-green-light">
                    <MessageOutlined className="a-mr-3 " />
                    <span>{props.review}</span>
                </span>
            </div>
        </div>
    </>
);
NewsListItem.defaultProps = {};

export default NewsListItem;
