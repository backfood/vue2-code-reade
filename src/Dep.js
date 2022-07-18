let uid = 0;
export default class Dep {
  constructor() {
    this.subs = []; // Wathcer的实例
    this.id = uid++;
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  deppend() {
    if (Dep.target) {
      this.addSub(Dep.target);
    }
  }
  notify() {
    const subs = this.subs.splice();
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  }
}
