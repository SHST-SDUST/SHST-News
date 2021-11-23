import loading from "./loading";
import { extend } from "./copy";
import { toast } from "./toast";
import operateLimit from "./operate-limit";
import axios from "axios";

const throttle = operateLimit.throttleFactory();
const debounce = operateLimit.debounceFactory();

const headers: Record<string, string> = {
    "content-type": "application/x-www-form-urlencoded",
};

export interface RequestInfo {
    load?: boolean;
    url: string;
    method?: "GET" | "POST";
    data?: Record<string, unknown>;
    param?: Record<string, unknown>;
    debounce?: number;
    throttle?: number;
    headers?: typeof headers;
    [key: string]: unknown;
}

type NoUndefinedField<T> = { [P in keyof T]-?: NonNullable<T[P]> };

export type RequestOptionsAllNeeded = NoUndefinedField<RequestInfo>;

export const request = <T>(requestInfo: RequestInfo) => {
    const defaultOptions: RequestOptionsAllNeeded = {
        load: true,
        url: "",
        method: "GET",
        headers: {},
        data: {},
        param: {},
        debounce: 0,
        throttle: 0,
    };
    const requestConfig = extend<RequestOptionsAllNeeded>(defaultOptions, requestInfo);
    return new Promise<T>((resolve, reject) => {
        const runRequest = () => {
            loading.start();
            console.log("Request for", requestConfig.url);
            axios
                .request<{ status?: number; msg?: string } & T>({
                    url: requestConfig.url,
                    data: requestConfig.data,
                    params: requestConfig.param,
                    method: requestConfig.method,
                    headers: requestConfig.headers,
                    transformRequest: [
                        (data: Record<string, string>): string => {
                            return Object.keys(data)
                                .map(key => `${key}=${data[key]}`)
                                .join("&");
                        },
                    ],
                })
                .then(res => {
                    if (res.status === 200 && res.data.status) {
                        if (res.data.status === -1 && res.data.msg) {
                            toast(res.data.msg, 200, "error");
                            return void 0;
                        }
                        resolve(res.data);
                    } else {
                        reject(res.data);
                    }
                })
                .finally(() => {
                    loading.end();
                });
        };
        if (requestConfig.debounce > 0) debounce(requestConfig.debounce, () => runRequest());
        else if (requestConfig.throttle > 0) throttle(requestConfig.debounce, () => runRequest());
        else runRequest();
    });
};
