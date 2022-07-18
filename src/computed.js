import Watcher from "./Watcher";
function initComputed(vm, computed) {
  const watchers = (vm._computedWatchers = Object.create(null));
  // computed properties are just getters during SSR
  //   const isSSR = isServerRendering();

  for (const key in computed) {
    const userDef = computed[key];
    const getter = typeof userDef === "function" ? userDef : userDef.get;

    // create internal watcher for the computed property.
    watchers[key] = new Watcher(
      vm,
      getter || noop,
      noop,
      computedWatcherOptions
    );
    defineComputed(vm, key, userDef);
  }
}

export function defineComputed(
  target, // vm
  key, // computed key
  userDef // getter函数
) {
  const shouldCache = !isServerRendering();
  if (typeof userDef === "function") {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set ? userDef.set : noop;
  }

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter(key) {
  return function computedGetter() {
    const watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        // true
        watcher.evaluate();
      }
      if (Dep.target) {
        // Watch 函数
        watcher.depend();
      }
      return watcher.value;
    }
  };
}
