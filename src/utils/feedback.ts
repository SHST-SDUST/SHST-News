import { data } from "src/modules/global-data";
import { throttle } from "src/modules/operate-limit";
import { request } from "src/modules/request";
import { confirm, toast } from "src/modules/toast";

export const report = (id: number, type: "post" | "review", content: string) => {
    if (data.user === 0) {
        toast("您处于游客状态，请在山科小站中操作");
        return void 0;
    }
    throttle(1000, async () => {
        const choice = await confirm("警告", "确定举报该帖子/评论吗，多次恶意举报将会限制您的账号");
        if (choice) {
            request<{ status: number }>({
                url: data.url + "/news/put/report",
                method: "POST",
                data: { id, type, content },
            })
                .then(() => {
                    toast("举报成功");
                })
                .catch(() => {
                    toast("操作失败，请稍后重试", "info");
                    return { status: 0 };
                });
        }
    });
};
