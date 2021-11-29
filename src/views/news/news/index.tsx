import { useState } from "react";
import Card from "src/components/card";
import { typeList } from "../common/type-group";
import styles from "./index.module.scss";

const TABS = [{ name: "全部", index: 0 }, ...typeList];
const SUB_TABS = { 4: [{ name: "全部", index: 0 }, ...typeList] };

const NewsIndex: React.FC = () => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const switchTab = (index: number): void => {
        setActiveTabIndex(index);
    };

    return (
        <>
            <div className={"a-y-center a-background-white " + styles["tab-container"]}>
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
        </>
    );
};

export default NewsIndex;
