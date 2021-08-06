// vite.config.ts
import { defineConfig } from "vite";
import postcssLit from "rollup-plugin-postcss-lit";
var vite_config_default = defineConfig({
  build: {
    lib: {
      entry: "src/ctn-todo-app/ctn-todo-app.ts",
      formats: ["es"]
    },
    rollupOptions: {
      external: /^lit-element/
    }
  },
  plugins: [
    postcssLit({
      importPackage: "lit"
    })
  ],
  resolve: {
    alias: [{
      find: /^~.+/,
      replacement: (val) => val.replace(/^~/, "")
    }]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgcG9zdGNzc0xpdCBmcm9tICdyb2xsdXAtcGx1Z2luLXBvc3Rjc3MtbGl0JztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJ1aWxkOiB7XG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogJ3NyYy9jdG4tdG9kby1hcHAvY3RuLXRvZG8tYXBwLnRzJyxcbiAgICAgIGZvcm1hdHM6IFsnZXMnXVxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IC9ebGl0LWVsZW1lbnQvLFxuICAgIH1cbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIC8vIGFkZCBzdXBwb3J0IGZvciBTQVNTIHdpdGggbGl0XG4gICAgcG9zdGNzc0xpdCh7XG4gICAgICBpbXBvcnRQYWNrYWdlOiBcImxpdFwiXG4gICAgfSlcbiAgXSwgIFxuICAvLyBzdHJpcCB+IGZyb20gc2FzcyBpbXBvcnRzXG4gIC8vIH4gaXMgdXNlZCBmb3IgdnNjb2RlIG5vZGVfbW9kdWxlcyBuYXZpZ2F0aW9uIHdpdGhpbiBzYXNzIGZpbGVzXG4gIHJlc29sdmU6IHtcbiAgICAvLyBAdHMtaWdub3JlIHJlcGxhY2VtZW50IGNhbiBiZSBhIGZ1bmN0aW9uXG4gICAgYWxpYXM6IFt7XG4gICAgICAgIGZpbmQ6IC9efi4rLyxcbiAgICAgICAgcmVwbGFjZW1lbnQ6ICh2YWw6IHN0cmluZykgPT4gdmFsLnJlcGxhY2UoL15+LywgXCJcIilcbiAgICB9XSxcbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQTtBQUNBO0FBR0EsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBLE1BQ0gsT0FBTztBQUFBLE1BQ1AsU0FBUyxDQUFDO0FBQUE7QUFBQSxJQUVaLGVBQWU7QUFBQSxNQUNiLFVBQVU7QUFBQTtBQUFBO0FBQUEsRUFHZCxTQUFTO0FBQUEsSUFFUCxXQUFXO0FBQUEsTUFDVCxlQUFlO0FBQUE7QUFBQTtBQUFBLEVBS25CLFNBQVM7QUFBQSxJQUVQLE9BQU8sQ0FBQztBQUFBLE1BQ0osTUFBTTtBQUFBLE1BQ04sYUFBYSxDQUFDLFFBQWdCLElBQUksUUFBUSxNQUFNO0FBQUE7QUFBQTtBQUFBOyIsCiAgIm5hbWVzIjogW10KfQo=
