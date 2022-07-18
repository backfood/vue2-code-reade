// 赋值 的时候也在访问本身
import { observe } from "./observe";
import Watcher from "./Watcher";
let obj = {
  a: {
    m: {
      n: 0,
    },
  },
  b: 10,
};

observe(obj);
new Watcher(obj, "a.m.n", (val) => {
  console.log("$$$$$", val);
});

obj.b++;
obj.a.m.n = 100;

let wat = (obj.b = Object.create(null));
wat = { ccc: 1000 };
console.log(obj.b);
