// 被改写的方法在数组的原型上
// Object.setPrototypeOf(o,obj); // 定义对象的原型为某个东西 等同于 o.__proto__=obj
import { def } from "./utils";
export const arrayPrototype = Array.prototype;

export const arrayMethods = Object.create(arrayPrototype);
let methodsNeedChange = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse",
];
methodsNeedChange.forEach((methodsName) => {
    
  const original = arrayPrototype[methodsName];
  def(arrayMethods, methodsName, function () {
      const ob=this.__ob__
      const args=[...arguments]
      // 有三种方法能插入元素至数组，需要将新插入的元素 observe
      let inserted=[]
      switch(methodsName){
        case "push":
        case "unshift":
             inserted=args;
        case "splice":
            inserted=args.slice(2)
            break;
      }
      if(inserted){
          ob.observeArray(inserted)
      }
      // 这里的this取决于调用当前fucntion的对象
    const result=   original.apply(this,arguments);
    return result
  },false);
});
