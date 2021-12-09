import { data } from "src/modules/global-data";
import { request, WrapperResponse } from "src/modules/request";
import { toast } from "src/modules/toast";

type ResponseNoticeItem = { id: number; p_id: number; summary: string; status: number };
export type NoticeItem = ResponseNoticeItem & { name: string; comment: string; origin: string };
export const fetchNoticeList = (page: number) => {
    type Response = { list: ResponseNoticeItem[] };
    return new Promise<WrapperResponse<{ list: NoticeItem[] }>>(resolve => {
        request<Response>({
            url: data.url + "/news/notice/getNotice/",
            param: { page },
        })
            .then(res => {
                resolve({
                    list: res.list.map(item => {
                        const [name, comment, origin] = item.summary.split("[-]");
                        return {
                            ...item,
                            name,
                            comment,
                            origin,
                        };
                    }),
                });
            })
            .catch(() => {
                toast("获取通知失败，请稍后重试", "error");
                console.error("fetchNoticeList");
            });
    });
};

export const readOne = (id: number, load = true) => {
    return request<{ status: number }>({
        load,
        url: data.url + "/news/notice/haveRead/",
        method: "POST",
        data: { id },
    });
};

export const readAll = () => {
    return request<{ status: number }>({
        url: data.url + "/news/notice/haveReadAll/",
        method: "POST",
    });
};
