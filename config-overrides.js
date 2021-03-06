const { override, fixBabelImports, overrideDevServer, disableEsLint } = require("customize-cra");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// https://github.com/arackaf/customize-cra

const configWebpackPlugins = () => config => {
    // 太卡关闭一些插件
    // 关闭`ESLINT`的插件 在`VSCode`校验
    // 关闭`CaseSensitivePathsPlugin`插件
    // 关闭`IgnorePlugin`插件
    config.plugins = config.plugins.filter(
        plugin =>
            plugin.constructor.name !== "ESLintWebpackPlugin" &&
            plugin.constructor.name !== "CaseSensitivePathsPlugin" &&
            plugin.constructor.name !== "IgnorePlugin"
    );
    // 添加插件
    process.env.NODE_ENV === "production" &&
        config.plugins.push(
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        drop_debugger: true,
                        drop_console: true,
                    },
                },
            })
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
        configWebpackPlugins()
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
