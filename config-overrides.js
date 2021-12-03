const { override, fixBabelImports, overrideDevServer, disableEsLint } = require("customize-cra");
// https://github.com/arackaf/customize-cra

// 太卡关闭一些插件
// 关闭`ESLINT`的插件 在`VSCode`校验
// 关闭`CaseSensitivePathsPlugin`插件
// 关闭`IgnorePlugin`插件
const disableEsLintPlugin = () => config => {
    config.plugins = config.plugins.filter(
        plugin =>
            plugin.constructor.name !== "ESLintWebpackPlugin" &&
            plugin.constructor.name !== "CaseSensitivePathsPlugin" &&
            plugin.constructor.name !== "IgnorePlugin"
    );
    return config;
};

module.exports = {
    webpack: override(
        fixBabelImports("import", {
            libraryName: "antd",
            libraryDirectory: "es",
            style: "css",
        }),
        disableEsLint(),
        disableEsLintPlugin()
    ),
    devServer: overrideDevServer(config => ({
        ...config,
        proxy: {
            "/api": {
                target: "http://dev.shstplus.touchczy.top/",
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    "^/api": "",
                },
            },
        },
    })),
};
