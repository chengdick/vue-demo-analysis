<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" @click="unbundle" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { observe, Watcher } from "../components/reactive";
let ac = {
  p: 1,
  c: 2,
};

observe(ac);
new Watcher(
  () => {
    console.log(ac.p, "lllllll-------");
  },
  () => {}
);
let s = ac.p;
@Options({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  unbundle = () => {
    // window.bus.$off("click", this.a);
    // console.log(window.bus, "=========");
    // console.log(111111);
    ac.p = 3;
    // ac.p++;
    // console.log(ac);
  };

  a = (data: any) => {
    console.log(data, "====111====");
  };
  created() {
    // window.bus.$on("click", this.a);
  }

  mounted() {
    // ac.p++;
  }
}
</script>
