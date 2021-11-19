/**
 * 全局变量
 */

export interface Data {
    url: string;
    tmp: {
        [key: string]: unknown;
    };
    user: number;
    project: string;
    openid: string;
    [key: string]: unknown;
}

export const data: Data = {
    url: "https://shstplus.touchczy.top",
    tmp: {},
    user: 0, // 0 未登录 1 已登陆
    openid: "",
    project: "山科小站",
};

export default { data };
