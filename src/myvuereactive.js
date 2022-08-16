const {validateSchema} = require("webpack");

function observe(obj) {
  for (let key in obj) {
    defineReactive(obj, key);
  }
}

function defineReactive(obj, key, val = obj[key]) {
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      dep.depend();
      console.log("响应式中 get data", key, val);
      return val;
    },
    set(newVal) {
      if (newVal === val) return val;
      val = newVal;
      dep.notify();
    },
  });
}

class Dep {
  deps = [];
  constructor() {}
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }
  addSub(watch) {
    this.deps.push(watch);
  }
  notify() {
    console.log("dep 的 notify");
    const deps = this.deps.slice();
    console.log(deps);
    for (let i = 0, len = deps.length; i < len; i++) {
      console.log(deps[i].update, "当前实例的 update 函数");
      console.log(deps[i]);
      deps[i].update();
    }
  }
}

Dep.target = null; // 保持全局唯一

class Watcher {
  value = null;
  constructor(fn) {
    this.fn = fn;
    this.value = this.get();
  }
  get() {
    let value;
    Dep.target = this;
    value = this.fn();
    Dep.target = null;
    return value;
  }
  update() {
    this.fn();
    console.log("通知 watcher 更新");
  }
  addDep(dep) {
    dep.addSub(this);
  }
}

function Vue(options) {
  this.data = options.data();
  const self = this;
  observe(this.data);
  this.mount = function () {
    new Watcher(self.render);
  };

  this.render = function () {
    const data = self.data;
    for (let key in data) {
      console.log("获取data 执行get", data[key]);
    }
    console.log("更新视图");
  };

  this.add = function () {
    self.data.a++;
  };
}

const instansce = new Vue({
  data() {
    return {
      a: 1,
      b: 3,
    };
  },
});

instansce.mount();

instansce.add();

// instansce.add();
// instansce.add();

// console.log(instansce.data.a, "最终值");
