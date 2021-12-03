import { data } from "src/modules/global-data";
import { request } from "src/modules/request";
import { toast } from "src/modules/toast";

export const publishNews = (
    content: string,
    type: number,
    imgs: { url: string; path: string }[],
    sub_type: number
) => {
    const img_url = imgs.map(item => item.path).join(",");
    return request<{ update?: boolean }>({
        method: "POST",
        url: data.url + "/news/publish/publish",
        data: {
            content,
            type,
            img_url,
            sub_type,
        },
    }).catch(() => {
        toast("请求失败，请稍后重试");
        return {};
    });
};
