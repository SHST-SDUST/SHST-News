import { FC } from "react";
import { OverheadItem } from "src/models/news/news";
import { Link } from "react-router-dom";
interface Props {
    overheadList: OverheadItem[];
}

const Overhead: FC<Props> = props => (
    <>
        <div>顶置</div>
        <div className="a-hr"></div>
        {props.overheadList.map((item, index) => (
            <Link to={"/detail/" + item.id} key={item.id}>
                <div className="a-color-grey">
                    <div className="a-line-3">{item.content}</div>
                    {index !== props.overheadList.length - 1 && <div className="a-hr"></div>}
                </div>
            </Link>
        ))}
    </>
);

Overhead.defaultProps = {};

export default Overhead;
