import styles from "./index.module.scss";
import { typeList, getSubTypeList, subTypeListMapper } from "../common/type-group";

interface Props {
    activeTabIndex: number;
    subActiveTabIndex: number;
    switchTab: (index: number, subIndex: number) => void;
}

const TABS = [{ name: "全部", index: 0 }, ...typeList];
const SUB_TABS: typeof subTypeListMapper = {
    4: [{ name: "全部", index: 0 }, ...getSubTypeList(4)],
};

const Tabs: React.FC<Props> = props => (
    <>
        <div className="a-pointer">
            <div
                className={"a-y-center a-pl-5 a-pr-5 a-background-white " + styles["tab-container"]}
            >
                {TABS.map(item => {
                    return (
                        <div
                            key={item.index}
                            onClick={() =>
                                props.activeTabIndex !== item.index &&
                                props.switchTab(item.index, props.subActiveTabIndex)
                            }
                        >
                            <div className={styles["tab-item-line"]}></div>
                            <div className={styles["tab-item"]}>
                                <div>{item.name}</div>
                            </div>
                            <div
                                className={
                                    styles["tab-item-line"] +
                                    " " +
                                    (props.activeTabIndex === item.index
                                        ? styles["tab-item-active"]
                                        : "")
                                }
                            ></div>
                        </div>
                    );
                })}
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
                        {SUB_TABS[props.activeTabIndex].map(item => {
                            return (
                                <div
                                    key={item.index}
                                    onClick={() =>
                                        props.subActiveTabIndex !== item.index &&
                                        props.switchTab(props.activeTabIndex, item.index)
                                    }
                                >
                                    <div className={styles["tab-item-line"]}></div>
                                    <div className={styles["tab-item"]}>
                                        <div>{item.name}</div>
                                    </div>
                                    <div
                                        className={
                                            styles["tab-item-line"] +
                                            " " +
                                            (props.subActiveTabIndex === item.index
                                                ? styles["tab-item-active"]
                                                : "")
                                        }
                                    ></div>
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles["container-gap"]}></div>
                </>
            )}
        </div>
    </>
);

Tabs.defaultProps = {};

export default Tabs;
