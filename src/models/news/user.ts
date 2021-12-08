import { data } from "src/modules/global-data";
import { request, WrapperResponse } from "src/modules/request";
import { toast } from "src/modules/toast";
import { User } from "../common/constant";
import { NewsItem } from "./news";

export const fetchUserInfo = () => {
    type Response = {
        user: null | User;
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

export type MyNewsItem = NewsItem & { create_time: string; status: number; message: string };
export const fetchMyNewsList = (page: number) => {
    type Response = { list: Omit<MyNewsItem, keyof User>[]; user: User };
    return new Promise<{ list: MyNewsItem[] }>(resolve => {
        request<Response>({
            url: data.url + `/news/home/getNews/${page}`,
        })
            .then(res => ({
                list: res.list.map(item => ({
                    ...item,
                    nick_name: res.user.nick_name,
                    avatar_url: res.user.avatar_url,
                    imgs: item.img_url.split(","),
                })),
            }))
            .then(res => resolve(res))
            .catch(() => {
                toast("获取我的新鲜事失败，请稍后重试", "error");
                console.error("fetchMyNewsList");
            });
    });
};
