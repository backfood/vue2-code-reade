/**
 * 
 * 1 遍历 option data属性，使用dedineproterty监听get和set动作。相当于event.on
 *  当get时，dep.deppend,set时，dep.notify
 * 2 挂载实例，这个过程会使用 new watcher 函数，watch函数接受两个参数 一个对象，
 *  以及这个对象改变时要执行的 render 函数。
 *  在nes wacher时会执行一次render函数，此时就会触发 option 选项中的data属性值的get函数。
 * 此时执行dep.deppend。此时dep.target 为 vm 。
 *  调用链为 dep.deppend->dep.target.addDep->dep.addSub->dep.subs.push(watcher) 。此时依赖收集完成。
 * 3 当set data 时，触发dep.notify,接着会遍历dep.subs数组。执行watcher.updata-> vm.render
 */


const Observer = function (data) {
  // 循环修改为每个属性添加get set
  for (let key in data) {
    defineReactive(data, key);
  }
};

const defineReactive = function (obj, key) {
  // 局部变量dep，用于get set内部调用
  const dep = new Dep();
  // 获取当前值
  let val = obj[key];
  Object.defineProperty(obj, key, {
    // 设置当前描述属性为可被循环
    enumerable: true,
    // 设置当前描述属性可被修改
    configurable: true,
    get() {
      console.log("in get");
      // 调用依赖收集器中的addSub，用于收集当前属性与Watcher中的依赖关系
      dep.depend();
      return val;
    },
    set(newVal) {
      if (newVal === val) {
        return;
      }
      val = newVal;
      // 当值发生变更时，通知依赖收集器，更新每个需要更新的Watcher，
      // 这里每个需要更新通过什么断定？dep.subs
      dep.notify();
    },
  });
};

const observe = function (data) {
  return new Observer(data);
};

const Watcher = function (vm, fn) {
  const self = this;
  this.vm = vm;
  // 将当前Dep.target指向自己
  Dep.target = this;
  // 向Dep方法添加当前Wathcer
  this.addDep = function (dep) {
    dep.addSub(self);
  };
  // 更新方法，用于触发vm._render
  this.update = function () {
    console.log("in watcher update");
    fn();
  };
  // 这里会首次调用vm._render，从而触发text的get
  // 从而将当前的Wathcer与Dep关联起来
  this.value = fn();
  // 这里清空了Dep.target，为了防止notify触发时，不停的绑定Watcher与Dep，
  // 造成代码死循环
  Dep.target = null;
};

const Dep = function () {
  const self = this;
  // 收集目标
  this.target = null;
  // 存储收集器中需要通知的Watcher
  this.subs = [];
  // 当有目标时，绑定Dep与Wathcer的关系
  this.depend = function () {
    if (Dep.target) {
      // 这里其实可以直接写self.addSub(Dep.target)，
      // 没有这么写因为想还原源码的过程。
      Dep.target.addDep(self);
    }
  };
  // 为当前收集器添加Watcher
  this.addSub = function (watcher) {
    self.subs.push(watcher);
  };
  // 通知收集器中所的所有Wathcer，调用其update方法
  this.notify = function () {
    for (let i = 0; i < self.subs.length; i += 1) {
      self.subs[i].update();
    }
  };
};

const Vue = function (options) {
  const self = this;
  // 将data赋值给this._data，源码这部分用的Proxy所以我们用最简单的方式临时实现
  if (options && typeof options.data === "function") {
    this._data = options.data.apply(this);
  }
  // 挂载函数
  this.mount = function () {
    new Watcher(self, self.render);
  };
  // 渲染函数
  this.render = function () {
    return self._data.text;
    // with (self) {
    //   _data.text;
    // }
  };
  // 监听this._data
  observe(this._data);
};

const vue = new Vue({
  data() {
    return {
      text: "hello world",
    };
  },
});

vue.mount(); // in get
// vue._data.text = "123"; // in watcher update /n in get
//
