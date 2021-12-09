import { FC, useState, useEffect } from "react";
import { fetchNoticeList, NoticeItem, readAll, readOne } from "src/models/news/notice";
import Loading, { Props as LoadingProps } from "src/components/loading";
import { NotificationOutlined, CheckOutlined } from "@ant-design/icons";
import { throttle } from "src/modules/operate-limit";
import { toast } from "src/modules/toast";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Notice: FC = () => {
    const nav = useNavigate();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState<LoadingProps["loading"]>("loadmore");
    const [noticeList, setNoticeList] = useState<NoticeItem[]>([]);

    useEffect(() => {
        loadNotices(page);
    }, []);

    const loadNotices = async (page: number) => {
        const res = await fetchNoticeList(page);
        setPage(page);
        setNoticeList(noticeList => noticeList.concat(res.list));
        if (res.list.length < 10) setLoading("nomore");
        else setLoading("loadmore");
    };

    const haveReadOne = (id: number, index: number, load: boolean) => {
        throttle(500, async () => {
            const res = await readOne(id, load);
            if (res.status === 1 && load) {
                noticeList[index].status = 1;
                setNoticeList([...noticeList]);
            }
        });
    };

    const haveReadAll = () => {
        throttle(500, async () => {
            const res = await readAll();
            if (res.status === 1) {
                toast("全部已读");
                setNoticeList(noticeList.map(item => ({ ...item, status: 1 })));
            }
        });
    };

    const toDetail = (item: NoticeItem, index: number) => {
        if (item.status === 0) haveReadOne(item.id, index, false);
        nav("/detail/" + item.p_id);
    };

    return (
        <div className="a-background-white padding-page">
            <div className="y-center a-flex-space-between">
                <span className="a-fontsize-16">
                    <NotificationOutlined />
                    <span className="a-ml">消息</span>
                </span>
                <span className="a-link" onClick={haveReadAll}>
                    <CheckOutlined />
                    <span>全部已读</span>
                </span>
            </div>
            <div className="a-hr"></div>
            {noticeList.map((item, index) => (
                <div key={item.id} className="a-mt-10">
                    <div onClick={() => toDetail(item, index)}>
                        <span>
                            <span className="a-color-blue">{item.name}:</span>
                            <span> {item.comment}</span>
                        </span>
                        <div className="a-lpt a-pl a-lpb a-pr a-background-grey a-lml a-lmt">
                            {item.origin}
                        </div>
                    </div>
                    <div className="a-y-center a-flex-space-between a-lmt">
                        <div className="a-color-green">{item.status === 0 ? "未读" : "已读"}</div>
                        <Button
                            size="small"
                            type="link"
                            disabled={item.status !== 0}
                            onClick={() => haveReadOne(item.id, index, true)}
                        >
                            标记为已读
                        </Button>
                    </div>
                    <div className="a-hr"></div>
                </div>
            ))}
            <Loading loading={loading} loadmore={() => loadNotices(page + 1)}></Loading>
        </div>
    );
};

export default Notice;
