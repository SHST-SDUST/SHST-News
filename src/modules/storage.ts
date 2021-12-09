import { safeDate } from "./datetime";

const convertKey = (key: string) => String(key).replace(/-storage$/g, "") + "-storage"; // 避免跟之前没有封装的缓存冲突

interface SavedStructure<T> {
    origin: T;
    expire: number;
}

const convertToOrigin = <T>(str: string): null | T => {
    try {
        const data: SavedStructure<T> = JSON.parse(str);
        if (Number.isNaN(data.expire)) return null; // 之前IOS的缓存可能会存储NaN
        if (data.expire && safeDate().getTime() > data.expire) return null;
        return data.origin;
    } catch (e) {
        console.log(e);
        return null;
    }
};

const convertToStr = <T = string>(origin: T, expire?: Date | null) => {
    const data: { origin: T; expire: null | number } = { origin, expire: null };
    if (expire) data.expire = expire.getTime();
    return JSON.stringify(data);
};

export default (type: "local" | "session" | "s" | "l" = "local") => {
    const storage = type === "local" || type === "l" ? window.localStorage : window.sessionStorage;
    return {
        has: function (originKey: string): boolean {
            const key = convertKey(originKey);
            return storage.getItem(key) ? true : false;
        },
        get: function <T = string>(originKey: string): null | T {
            const key = convertKey(originKey);
            const str = storage.getItem(key);
            if (str === null) return null;
            const origin = convertToOrigin<T>(str);
            if (origin === null) this.remove(key);
            return origin;
        },
        set: function <T = string>(originKey: string, data: T, expire = null): void {
            const key = convertKey(originKey);
            const str = convertToStr(data, expire);
            return storage.setItem(key, str);
        },
        remove: function (originKey: string): void {
            const key = convertKey(originKey);
            return storage.removeItem(key);
        },
        clear: function () {
            return storage.clear();
        },
    };
};
