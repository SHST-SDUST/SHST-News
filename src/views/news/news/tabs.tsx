import styles from "./index.module.scss";
import { typeList, getSubTypeList, subTypeListMapper } from "../common/type-group";
import React, { useState, useEffect } from "react";
import { fetchUserInfo } from "src/models/news/user";
import { checkUserInfo, updateUserInfo } from "src/utils/mini-program";
import { Avatar, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";

interface Props {
    activeTabIndex: number;
    subActiveTabIndex: number;
    switchTab: (index: number, subIndex: number) => void;
}

const TABS = [{ name: "全部", index: 0 }, ...typeList];
const SUB_TABS: typeof subTypeListMapper = {
    4: [{ name: "全部", index: 0 }, ...getSubTypeList(4)],
};

const Tabs: React.FC<Props> = props => {
    const [nickName, setNickName] = useState("游客");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [notice, setNotice] = useState(0);

    useEffect(() => {
        getUserInfo();
    }, []);

    const getUserInfo = async () => {
        const res = await fetchUserInfo();
        if (res.update) {
            updateUserInfo();
            setTimeout(() => checkUserInfo(getUserInfo), 500);
        } else {
            if (res.user) {
                setNickName(res.user.nick_name);
                setAvatarUrl(res.user.avatar_url);
                setNotice(res.notice);
            }
        }
    };

    const getTabItem = (item: typeof TABS[0], index: number) => (
        <>
            <div className={styles["tab-item-line"]}></div>
            <div className={styles["tab-item"]}>
                <div>{item.name}</div>
            </div>
            <div
                className={
                    styles["tab-item-line"] +
                    " " +
                    (index === item.index ? styles["tab-item-active"] : "")
                }
            ></div>
        </>
    );

    return (
        <div className="a-pointer ">
            <div className={"a-y-center a-background-white " + styles["tab-container"]}>
                <div className={"a-y-center a-pl-5 a-pr-5 " + styles["overflow-x-auto"]}>
                    {TABS.map(item => (
                        <div
                            key={item.index}
                            onClick={() =>
                                props.activeTabIndex !== item.index &&
                                props.switchTab(item.index, props.subActiveTabIndex)
                            }
                        >
                            {getTabItem(item, props.activeTabIndex)}
                        </div>
                    ))}
                </div>
                <div className={styles.mask}></div>
                <div className={"a-y-center " + styles["user-info-container"]}>
                    <Badge count={notice} size="small">
                        <Avatar
                            size="small"
                            style={{ backgroundColor: "#1890ff" }}
                            icon={<UserOutlined />}
                            src={avatarUrl}
                        />
                    </Badge>
                    <div className="a-y-center a-ml-6 a-line-1">{nickName}</div>
                </div>
            </div>
            <div className={styles["container-gap"]}></div>

            {SUB_TABS[props.activeTabIndex] && (
                <>
                    <div
                        className={
                            "a-y-center a-pl-5 a-pr-5 a-background-white " +
                            styles["sub-tab-container"]
                        }
                    >
                        {SUB_TABS[props.activeTabIndex].map(item => (
                            <div
                                key={item.index}
                                onClick={() =>
                                    props.subActiveTabIndex !== item.index &&
                                    props.switchTab(props.activeTabIndex, item.index)
                                }
                            >
                                {getTabItem(item, props.subActiveTabIndex)}
                            </div>
                        ))}
                    </div>
                    <div className={styles["container-gap"]}></div>
                </>
            )}
        </div>
    );
};

Tabs.defaultProps = {};

export default Tabs;
