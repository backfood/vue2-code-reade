import Dep from "./Dep";
import { observe } from "./observe";

export default function defineReactive(data, key, value) {
  const dep = new Dep();
  if (arguments.length === 2) {
    value = data[key];
  }
  // 子元素也进行观测
  let childOb = observe(value); // 自此对象依层监测变化
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      // 如果处于依赖收集阶段
      if (Dep.target) {
        dep.deppend();
        if (childOb) {
          childOb.dep.deppend();
        }
      }
      return value;
    },
    set(newvalue) {
      if (value === newvalue) return;
      value = newvalue;
      childOb = observe(value);
      dep.notify();
    },
  });
}

// 数组  psuh pop shift unshift
