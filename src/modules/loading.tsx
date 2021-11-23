import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import ReactDOM from "react-dom";

let counter = 0;
/**
 * start
 */
const start = (): void => {
    if (counter === 0) {
        const container = document.createElement("div");
        container.setAttribute("id", "global-spin-element");
        document.body.appendChild(container);
        ReactDOM.render(
            <Spin indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />} tip="加载中..." />,
            container
        );
    }
    counter++;
};

/**
 * end
 */
const end = (): void => {
    counter--;
    if (counter === 0) {
        const loadingNode = document.getElementById("global-spin-element");
        if (loadingNode) {
            loadingNode.classList.add("global-spin-element-hide");
            loadingNode.addEventListener("transitionend", () => {
                document.body.removeChild(loadingNode);
            });
        }
    }
};

export default { start, end };
