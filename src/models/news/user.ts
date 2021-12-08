import { data } from "src/modules/global-data";
import { request, WrapperResponse } from "src/modules/request";
import { toast } from "src/modules/toast";

export const fetchUserInfo = () => {
    type Response = {
        user: null | { nick_name: string; avatar_url: string };
        update: boolean;
        notice: number;
    };
    return new Promise<WrapperResponse<Response>>(resolve => {
        request<Response>({
            url: data.url + "/news/home/getUserInfo",
        })
            .then(res => resolve(res))
            .catch(() => {
                toast("获取用户信息失败，请稍后重试", "error");
                console.log("fetchUserInfo", "reject");
            });
    });
};

export const fetchUserStatus = () => {
    type Response = { info: "" | "tourist" };
    return new Promise<WrapperResponse<Response>>(resolve => {
        request<Response>({
            url: data.url + "/news/home/getUserStatus",
        })
            .then(res => resolve(res))
            .catch(() => {
                toast("获取用户状态失败，请稍后重试", "error");
                console.log("fetchUserStatus", "reject");
            });
    });
};
