const { override, fixBabelImports, overrideDevServer, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = {
    webpack: override(
        fixBabelImports("import", {
            libraryName: "antd",
            libraryDirectory: "es",
            style: "css",
        }),
        addWebpackAlias({
            "@": path.resolve(__dirname, "src"),
        })
    ),
    devServer: overrideDevServer(config => ({
        ...config,
    })),
};
