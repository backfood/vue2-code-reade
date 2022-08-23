/**
 * commonjs 运行时加载 es6 编译时输出接口
 * require 同步加载模块，es6异步加载
 * commonjs浅拷贝，es6模块引入（只读）
 * commonjs的引用路径是可以拼接的，es6不可以
 * const bModule = require('./' + fileName)
 */
/**
 * commonjs
 * 基本数据类型复制，复杂数据类型浅拷贝，
 * require加载模块时，会运行整个模块，当多个require加载同一个模块时，
 * 取第一次运行时产生的值
 * 循环加载时，只输出已加载的部分，未加载的不输出
 */
/**
 * es6 导入变量是对原值的引用
 *
 */
import es6A from "./es6A";
const commonjsA = require("./commonjsA");
commonjsA.foo("主文件");
