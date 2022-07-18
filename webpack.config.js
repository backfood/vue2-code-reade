const { resolve } = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin"); // 默认会船舰一个html文件引入所有打包输出资源
const { Template } = require("webpack");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "build.js",
    path: resolve(__dirname, "build"),
  },
  //  loader的配置
  module: {
    rules: [
      {
        // 匹配哪些文件
        test: /\.css$/,
        // 使用哪些loader
        use: [
          // use数组中执行顺序为从右到左
          "style-loader", // 创建style标签 将js中的样式资源插入head中生效
          "css-loader", // 将css文件变成commenjs模块加载js中内容是样式字符串
        ],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        // 这种方式处理不了html中引用的图片
        test: /\.(png|jpg|gif)$/,
        loader: "url-loader", // 需要下载 url-loader file-loader  应为url-loader依赖file-loader
        options: {
          // 超过8kb就会变成base64（减少请求数量 图片体积大以至熟读慢）
          limit: 80 * 1024, // 一般8-12kb
          // 因为 url-loader 默认使用es6模块解析，而html-loader引入图片是commenjs
          // 解析时 [object Module]
          esModule: false,
          // [hash:10] 取图片中hash的前10位
          // [ext] 取文件的原拓展名
          name: "[hash:10].[ext]",
        },
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      // 打包其他资源 除html css js 以外的资源
      {
        exclude: /\.(css|js|html)$/,
        loader: "file-loader",
        options: {

          name: "[hash:10].[ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      // 复制 ./src/index.html 文件 ，并自动给引入打包输出所有资源（js/css）
      template: "./src/index.html",
    }),
  ],
  mode: "development", // production
  // 自动打开 刷新浏览器
  // 启动devServer的指令位 npx webpack-dev-server
  devServer: {
    static: resolve(__dirname, "build"),
    compress: true,
    port: 8080,
  },
};
