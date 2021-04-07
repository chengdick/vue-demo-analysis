class LRUCache {
  capacity: number;
  keys: number[] = [];
  cache: Record<string, any> = {};
  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: number) {
    let index = this.keys.findIndex((item: number) => item === key);
    if (this.keys.includes(key)) {
      this.keys.splice(index, 1);
      this.keys.unshift(key);
    }
    return this.cache[key] || -1;
  }

  put(key: number, value: any) {
    this.cache[key] = value;
    if (this.keys.includes(key)) {
      let index = this.keys.findIndex((item) => item === key);
      this.keys.splice(index, 1);
    }

    this.keys.unshift(key);
    if (this.keys.length > this.capacity) {
      const key1 = this.keys.slice(-1)[0];
      delete this.cache[key1];
      this.keys.pop();
    }
  }
}

let lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // 缓存是 {1=1}
lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
lRUCache.get(1); // 返回 1
lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
lRUCache.get(2); // 返回 -1 (未找到)
lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}+++++++++++++++++++++++
lRUCache.get(1); // 返回 -1 (未找到)
lRUCache.get(3); // 返回 3
lRUCache.get(4); // 返回 4

console.log(lRUCache, "乱来");
