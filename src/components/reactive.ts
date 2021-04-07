// 消费依赖方法
class Dep {
  subs: Array<Watcher> = []; // 依赖队列
  static target: any = null; // 静态属性
  addSub(sub: Watcher) {
    //添加队列
    this.subs = Array.from(new Set([...this.subs, sub]));
  }
  depend() {
    //添加队列
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }
  notify() {
    //消费队列方法
    for (var i = 0, l = this.subs.length; i < l; i++) {
      this.subs[i].run();
    }
  }
}

//观察者
class Watcher {
  cb: Function;
  exp: Function;
  constructor(exp: Function, cb: Function) {
    Dep.target = this;
    this.cb = cb; //回调
    this.exp = exp; //观察者处罚方法
  }
  addDep(dep: Dep) {
    //dep把watcher存到subs里面
    dep.addSub(this);
  }
  run() {
    //执行方法
    this.cb && this.cb(this.exp());
  }
}

//数据劫持
function defineReactive(obj: any, key: string, val: any) {
  let dep = new Dep();
  Object.defineProperty(obj, key, {
    enumerable: true, //可以枚举
    configurable: true, //当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。
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

// 数据入口方法
const observe = (data: any) => {
  Object.keys(data).forEach((key) => {
    defineReactive(data, key, data[key]);
  });
};

export { observe, Watcher };

// [watcher,watcher]
