import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import Card from "src/components/card";
import { typeList, getSubTypeList } from "../common/type-group";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";

const TABS = [{ name: "全部", index: 0 }, ...typeList];
const SUB_TABS = { 4: [{ name: "全部", index: 0 }, ...getSubTypeList(4)] };

const NewsIndex: React.FC = () => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const switchTab = (index: number): void => {
        setActiveTabIndex(index);
    };

    return (
        <div className="padding-page">
            <div className={"a-y-center a-background-white a-pointer " + styles["tab-container"]}>
                <div className="a-y-center a-pl-5 a-pr-5">
                    {TABS.map(item => {
                        return (
                            <div
                                key={item.index}
                                onClick={() =>
                                    activeTabIndex !== item.index && switchTab(item.index)
                                }
                            >
                                <div className={styles["tab-item-line"]}></div>
                                <div className={styles["tab-item"]}>
                                    <div className="">{item.name}</div>
                                </div>
                                <div
                                    className={
                                        styles["tab-item-line"] +
                                        " " +
                                        (activeTabIndex === item.index
                                            ? styles["tab-item-active"]
                                            : "")
                                    }
                                ></div>
                            </div>
                        );
                    })}
                </div>
                <div></div>
            </div>
            <div className={styles["container-gap"]}></div>
            <div>
                <Card
                    content={
                        <div>
                            <div>Card</div>
                        </div>
                    }
                ></Card>
            </div>
            <Link to="publish" className={"a-x-center a-y-center " + styles["new-post-container"]}>
                <PlusOutlined style={{ fontSize: "20px" }} />
            </Link>
        </div>
    );
};

export default NewsIndex;
