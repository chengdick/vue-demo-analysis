<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    msg: String,
  },
})
export default class About extends Vue {
  Myevent: any;
  constructor(props: any) {
    super(props);
  }

  created() {}
}
</script>
