import { data } from "src/modules/global-data";
import { request, WrapperResponse } from "src/modules/request";
import { toast } from "src/modules/toast";
import { User } from "../common/constant";

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
