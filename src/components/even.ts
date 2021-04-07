export class Myevent {
  subs: any;
  constructor() {
    // 存储队列
    this.subs = Object.create(null);
  }

  // 订阅队列
  $on(target: string, handler: Function) {
    this.subs[target] = this.subs[target] || [];
    this.subs[target].push(handler);
  }

  //发布队列
  $emit(target: string, data: any) {
    if (this.subs[target]) {
      this.subs[target].forEach((item: Function) => {
        item(data);
      });
    }
  }

  //解绑
  $off(target?: string, handler?: Function) {
    if (!arguments.length) {
      this.subs = Object.create(null);
    } else {
      if (target) {
        let cbs = this.subs[target];
        let i = cbs.length;
        let cb;
        while (i--) {
          cb = cbs[i];
          if (cb === handler || cb.fn === handler) {
            cbs.splice(i, 1);
            break;
          }
        }
      }
    }
  }

  //使用一次解绑
  $once(target: string, handler: Function) {
    let on: any = (item: any) => {
      this.$off(target, on);
      handler.call(this, item);
    };
    on.fn = handler;
    this.$on(target, on);
  }
}

// {
//   'click':[cb,cb]
// }
