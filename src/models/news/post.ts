import { data } from "src/modules/global-data";
import { request, WrapperResponse } from "src/modules/request";
import { toast } from "src/modules/toast";

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
