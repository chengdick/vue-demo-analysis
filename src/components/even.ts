export class Myevent {
  subs: any;
  constructor() {
    this.subs = Object.create(null);
  }

  $on(target: string, handler: Function) {
    if (target) {
      this.subs[target] = this.subs[target] || [];
      this.subs[target].push(handler);
    }
  }

  $emit(target: string, data: any) {
    if (this.subs[target]) {
      this.subs[target].forEach((item: Function) => {
        item(data);
      });
    }
  }

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

  $once(target: string, handler: Function) {
    let on: any = (item: any) => {
      this.$off(target, on);
      handler.apply(this, [item]);
    };
    on.fn = handler;
    this.$on(target, on);
  }
}
