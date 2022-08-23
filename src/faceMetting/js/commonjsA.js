console.log("commonjs 默认执行的");
module.exports = {
  name: "commonjs",
  foo: function (from) {
    console.log("此输出来自commonjsA文件", from ? from : "默认输出");
  },
};
