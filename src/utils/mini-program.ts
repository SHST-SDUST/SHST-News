export const updateUserInfo = () => {
    // 小程序`sdk`跳转到小程序页面更新用户信息
    console.log("小程序`sdk`跳转到小程序页面更新用户信息");
    return void 0;
};

export const checkUserInfo = (funct: () => void) => {
    // confirm用户点击确认后刷新用户头像等信息
    // 完成之后重新执行函数获取用户信息
    funct();
    return void 0;
};
