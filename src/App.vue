<template>
  <div id="nav">
    <div @click="click">点击</div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { observe, Watcher } from "./components/reactive";
let ac = {
  p: 1,
  c: 2,
};

observe(ac);
new Watcher(
  () => {
    console.log(ac);
  },
  () => {}
);
declare const window: any;
export default class About extends Vue {
  constructor(props: any) {
    super(props);
  }

  created() {
    window.bus.$on("click", (obj: any) => {
      ac.p = ac.p + obj.a;
    });
  }

  click = () => {
    window.bus.$emit("click", { a: 1 });
    // window.bus.$off("click");
  };
}
</script>
