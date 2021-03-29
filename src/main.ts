import { createApp } from "vue";
import App from "./App.vue";
import { Myevent } from "./components/even";
declare const window: any;
window.bus = new Myevent();

createApp(App).mount("#app");
