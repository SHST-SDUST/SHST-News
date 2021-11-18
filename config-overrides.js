const { override, fixBabelImports, overrideDevServer } = require("customize-cra");

module.exports = {
    webpack: override(
        fixBabelImports("import", {
            libraryName: "antd",
            libraryDirectory: "es",
            style: "css",
        })
    ),
    devServer: overrideDevServer(config => ({
        ...config,
    })),
};
