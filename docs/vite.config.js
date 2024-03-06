import { defineConfig } from "vite";

export default defineConfig({
  minify: false,
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
    },
  },
  build: {
    cssTarget: "chrome83",
  },
  plugins: [
    styleImport({
      libs: [
        {
          libraryName: "element-plus",
          resolveStyle: (name) => {
            return `element-plus/lib/theme-chalk/${name}.css`;
          },
          resolveComponent: (name) => {
            return `element-plus/lib/${name}`;
          },
        },
      ],
    }),
  ],
});
