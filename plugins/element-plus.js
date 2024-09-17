import { defineNuxtPlugin } from "#app";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElIcons from "@element-plus/icons-vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ElementPlus);

  // Register all Element Plus icons globally
  for (const [key, component] of Object.entries(ElIcons)) {
    nuxtApp.vueApp.component(key, component);
  }
});
