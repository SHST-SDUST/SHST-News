import { typeList } from "./type-group.js";

export const typeFilter = (type: string | number) => {
    const index = Number(type);
    const arr = ["全部"];
    typeList.forEach(v => arr.push(v.name));
    arr.push("兼职", "租房"); // 7 8
    return arr[index] ? arr[index] : "其他";
};

export const userFilter = (type: string | number) => {
    type = Number(type);
    switch (type) {
        case 1:
            return "开发者";
        case 2:
            return "管理员";
    }
    return "";
};

export const statusFilter = (status: number) => {
    switch (status) {
        case 0:
            return "审核中";
        case 1:
            return "审核通过";
        case 2:
            return "审核拒绝";
    }
};
