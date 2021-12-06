import { data } from "src/modules/global-data";
import { request, WrapperResponse } from "src/modules/request";
import { toast } from "src/modules/toast";

export type NewsItem = {
    nick_name: string;
    avatar_url: string;
    id: number;
    host: string;
    img_url: string;
    type: number;
    content: string;
    praise: number;
    review: number;
    look_over: number;
    imgs: string[];
};

export type OverheadItem = {
    content: string;
    id: number;
};

export const fetchNewsList = (page: number, type: number, subType: number) => {
    type Response = { list: NewsItem[] };
    return request<Response>({
        url: data.url + `/news/home/getNews/${type}/${page}`,
        param: {
            sub_type: subType,
        },
    })
        .then(res => ({
            ...res,
            list: res.list.map(item => ({ ...item, imgs: item.img_url.split(",") })),
        }))
        .catch(() => {
            toast("请求失败，请稍后重试", "error");
            console.error("fetchNewsList");
            const rtn: WrapperResponse<Response> = { status: 0, list: [] };
            return rtn;
        });
};

export const fetchOverhead = (type: number) => {
    type Response = { list: OverheadItem[] };
    return request<Response>({
        url: data.url + `/news/home/getOverhead/${type}`,
    }).catch(() => {
        toast("请求失败，请稍后重试", "error");
        console.error("fetchOverhead");
        const rtn: WrapperResponse<Response> = { status: 0, list: [] };
        return rtn;
    });
};
