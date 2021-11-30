export const typeList = [
    { name: "失物", index: 1 },
    { name: "招领", index: 2 },
    { name: "拼车", index: 3 },
    { name: "二手", index: 4 },
    { name: "校园", index: 5 },
    { name: "其他", index: 6 },
];

export const subTypeListMapper: Record<
    string,
    {
        name: string;
        index: number;
    }[]
> = {
    4: [
        { name: "学习", index: 1 },
        { name: "电子", index: 2 },
        { name: "美妆", index: 3 },
        { name: "玩具", index: 4 },
        { name: "生活", index: 5 },
        { name: "其他", index: 6 },
    ],
};
export const getSubTypeList = (type: number | string) => {
    return subTypeListMapper[Number(type)];
};

export const generateGroup = <T>(arr: T[], n: number) => {
    const group = [];
    let inner: T[] = [];
    arr.forEach((v, i) => {
        if (i && i % n === 0) {
            group.push(inner);
            inner = [];
        }
        inner.push(v);
    });
    if (inner.length) group.push(inner);
    return group;
};

export const generateNameList = (arr: { name: string }[], ...args: string[]) => {
    const list = [];
    list.push(...args);
    arr.forEach(v => list.push(v.name));
    return list;
};
