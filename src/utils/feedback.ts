import { data } from "src/modules/global-data";
import { request } from "src/modules/request";
import { confirm, toast } from "src/modules/toast";

export const report = async (id: number, type: "post" | "review", content: string) => {
    if (data.user === 0) {
        toast("您处于游客状态，请在山科小站中操作");
        return void 0;
    }
    const choice = await confirm("警告", "确定举报该帖子/评论吗，多次恶意举报将会限制您的账号");
    if (choice) {
        const res = await request<{ status: number }>({
            url: data.url + "/put/report",
            method: "POST",
            data: { id, type, content },
        });
        if (res.status === 1) {
            toast("举报成功");
        } else {
            toast("操作失败，请稍后重试", "info");
        }
    }
};
