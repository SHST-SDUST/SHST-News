import { data } from "src/modules/global-data";
import { request } from "src/modules/request";
import { toast } from "src/modules/toast";

export const publishNews = (
    content: string,
    type: number,
    sub_type: number,
    imgs: { url: string; path: string }[]
) => {
    type ResponseType = { update?: boolean };
    const img_url = imgs.map(item => item.path).join(",");
    return new Promise<ResponseType>(resolve => {
        request<ResponseType>({
            method: "POST",
            url: data.url + "/news/publish/publish",
            data: {
                content,
                type,
                img_url,
                sub_type,
            },
        })
            .then(res => resolve(res))
            .catch((err: Error) => {
                toast("请求失败，请稍后重试", "error");
                console.log("publishNews", err);
            });
    });
};
