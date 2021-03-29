class Dep {
  subs: Array<Watcher> = [];
  static target: any;
  addSub(sub: Watcher) {
    this.subs = Array.from(new Set([...this.subs, sub]));
    // this.subs.push(sub);
  }
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }
  notify() {
    for (var i = 0, l = this.subs.length; i < l; i++) {
      this.subs[i].run();
    }
  }
}
Dep.target = null;
class Watcher {
  cb: Function;
  exp: Function;
  constructor(exp: Function, cb: Function) {
    Dep.target = this;
    this.cb = cb;
    this.exp = exp;
  }
  addDep(dep: Dep) {
    dep.addSub(this);
  }
  run() {
    this.cb && this.cb(this.exp());
  }
}

function defineReactive(obj: any, key: string, val: any) {
  let dep = new Dep();
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      if (Dep.target) {
        dep.depend();
      }
      return val;
    },
    set(newVal) {
      if (newVal === val || (newVal !== newVal && val !== val)) {
        return;
      }
      val = newVal;
      dep.notify();
    },
  });
}

const observe = (data: any) => {
  Object.keys(data).forEach((key) => {
    defineReactive(data, key, data[key]);
  });
};

export { observe, Watcher };
