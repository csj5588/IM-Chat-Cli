const { join } = require("path");

const umircExport = {
  hash: true,
  plugins: [
    [
      "umi-plugin-react",
      {
        antd: true,
        dva: true,
        routes: {
          exclude: [
            /models|services|components\//,
            o => /[A-Z]/.test(o.component),
            o => !/[\\/]((index)|(404)|(_layout))[\\.]js$/.test(o.component),
          ],
        },
      },
    ],
  ],
  alias: {
    components: join(process.cwd(), "src", "components"),
    utils: join(process.cwd(), "src", "utils"),
    assets: join(process.cwd(), "src", "assets"),
    themes: join(process.cwd(), "src", "themes"),
    config: join(process.cwd(), "src", "config"),
    public: join(process.cwd(), "public"),
  },
};

export default umircExport;
