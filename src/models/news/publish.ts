import { data } from "src/modules/global-data";
import { request, WrapperResponse } from "src/modules/request";
import { toast } from "src/modules/toast";
import { User } from "../common/constant";

export const publishNews = (
    content: string,
    type: number,
    subType: number,
    imgs: { url: string; path: string }[]
) => {
    type ResponseData = { update?: boolean };
    type Response = WrapperResponse<ResponseData>;
    const img_url = imgs.map(item => item.path).join(",");
    return new Promise<Response>(resolve => {
        request<ResponseData>({
            method: "POST",
            url: data.url + "/news/publish/publish",
            data: {
                id: 0,
                content,
                type,
                img_url,
                sub_type: subType,
            },
        })
            .then(res => resolve(res))
            .catch(() => {
                toast("请求失败，请稍后重试", "error");
                console.log("publishNews", "reject");
            });
    });
};

export const postLike = (id: number, like: boolean) => {
    type Response = { status: number };
    return new Promise<WrapperResponse<Response>>(resolve => {
        const operate = like ? "praise" : "delete";
        request<Response>({
            url: data.url + `/news/praise/${operate}`,
            method: "POST",
            data: { id },
        })
            .then(res => resolve(res))
            .catch(() => {
                toast("操作失败，请稍后重试", "error");
                console.log("postLike", "reject");
            });
    });
};

export const postReview = (id: number, f_id: number, r_id: number, comment: string) => {
    type Response = {
        update?: boolean;
        audit: boolean;
        series: number;
        user: User;
        id: number;
    };
    return new Promise<WrapperResponse<Response>>(resolve => {
        request<Response>({
            url: data.url + `/news/review/review`,
            method: "POST",
            data: { id, comment, r_id, f_id },
        })
            .then(res => resolve(res))
            .catch(() => {
                toast("评论失败，请稍后重试", "error");
                console.log("postReview", "reject");
            });
    });
};

export const deleteReview = (p_id: number, r_id: number) => {
    type Response = { status: number };
    return new Promise<WrapperResponse<Response>>(resolve => {
        request<Response>({
            url: data.url + `/news/review/delete`,
            method: "POST",
            data: { p_id, r_id },
        })
            .then(res => resolve(res))
            .catch(() => {
                toast("删除失败，请稍后重试", "error");
                console.log("deleteReview", "reject");
            });
    });
};
