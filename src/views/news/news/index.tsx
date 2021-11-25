import Card from "src/components/card";
import { typeList } from "../common/type-group";
import styles from "./index.module.scss";

const tabs = [{ name: "全部", index: 0 }, ...typeList];
const subTabs = { 4: [{ name: "全部", index: 0 }, ...typeList] };

const NewsIndex: React.FC = () => {
    return (
        <>
            <div className={"a-y-center a-background-white " + styles["tab-container"]}>
                <div className="a-y-center">
                    {tabs.map(item => {
                        return (
                            <div key={item.index}>
                                <div>{item.name}</div>
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
