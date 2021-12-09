import { data } from "src/modules/global-data";
import { request, WrapperResponse } from "src/modules/request";
import { toast } from "src/modules/toast";

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
