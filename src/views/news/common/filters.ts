import { typeList } from "./type-group";

const typesArray: string[] = [];

export const typeFilter = (type: string | number) => {
    let arr: string[] = [];
    if (typesArray.length) {
        arr = typesArray;
    } else {
        // ... 7 8
        arr.push("全部", ...typeList.map(item => item.name), "兼职", "租房");
    }
    const index = Number(type);
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
