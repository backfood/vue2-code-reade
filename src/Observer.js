import { def } from "./utils";
import defineReactive from "./defineReactive";
import { arrayMethods } from "./array";
import { observe } from "./observe";
import Dep from "./Dep";
export default class Observer {
  constructor(value) {
      this.dep=new Dep()
    // 构造函数中的this表示实例
    def(value, "__ob__", this, false); // 添加__ob__属性，值时这次new的实例
    if (Array.isArray(value)) {
      Object.setPrototypeOf(value, arrayMethods);
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }
  walk(value) {
    for (let key in value) {
      defineReactive(value, key);
    }
  }
  observeArray(arr) {
    for (let i = 0, l = arr.length; i < l; i++) {
      observe(arr[i]);
    }
  }
}
