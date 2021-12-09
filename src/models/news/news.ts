import { data } from "src/modules/global-data";
import { request, WrapperResponse } from "src/modules/request";
import { toast } from "src/modules/toast";

export type NewsItem = {
    nick_name: string;
    avatar_url: string;
    user_type: number;
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

export const fetchNewsList = (page: number, type: number, subType: number, load = true) => {
    type Response = { list: NewsItem[] };
    return request<Response>({
        load,
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
            toast("获取新鲜事失败，请稍后重试", "error");
            console.error("fetchNewsList");
            const rtn: WrapperResponse<Response> = { status: 0, list: [] };
            return rtn;
        });
};

export type OverheadItem = {
    content: string;
    id: number;
};

export const fetchOverhead = (type: number, load = true) => {
    type Response = { list: OverheadItem[] };
    return request<Response>({
        load,
        url: data.url + `/news/home/getOverhead/${type}`,
    }).catch(() => {
        toast("获取顶置信息失败，请稍后重试", "error");
        console.error("fetchOverhead");
        const rtn: WrapperResponse<Response> = { status: 0, list: [] };
        return rtn;
    });
};

type ResponseReviewItem = {
    id: number;
    nick_name: string;
    user_type: number;
    avatar_url: string;
    review: string;
    series: number;
    mine?: boolean;
    review_time: string;
    f_id: number;
    r_id: number;
};

export type NewsDetail = Omit<NewsItem, "id" | "user_type"> & { create_time: string };
export type ReviewItem = ResponseReviewItem & {
    children: ResponseReviewItem[];
};

export const fetchNewsDetail = (id: number) => {
    return new Promise<{
        detail: NewsDetail;
        reviews: ReviewItem[];
        praised: boolean;
        reviewIdNameMap: Record<string, string>;
    }>(resolve => {
        request<{ detail: NewsDetail; reviews: ResponseReviewItem[]; praised: boolean }>({
            load: false,
            url: data.url + `/news/home/getDetail/${id}`,
        })
            .then(res => {
                const reviewIdNameMap: Record<string, string> = {};
                res.reviews.forEach(item => (reviewIdNameMap[item.id] = item.nick_name));
                resolve({
                    ...res,
                    detail: {
                        ...res.detail,
                        imgs: res.detail.img_url.split(","),
                    },
                    reviews: res.reviews
                        .filter(item => item.f_id === 0)
                        .map(item => ({
                            ...item,
                            children: res.reviews.filter(innerItem => innerItem.f_id === item.id),
                        })),
                    reviewIdNameMap,
                });
            })
            .catch(() => {
                toast("获取详情信息失败，请稍后重试", "error");
                console.error("fetchNewsDetail");
            });
    });
};
