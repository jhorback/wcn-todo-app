import { defineConfig } from 'vite'
import postcssLit from 'rollup-plugin-postcss-lit';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/ctn-todo-app.ts',
      formats: ['es']
    },
    rollupOptions: {
      external: /^lit-element/,
    }
  },
  plugins: [
    // add support for SASS with lit
    postcssLit({
      importPackage: "lit"
    })
  ],  
  // strip ~ from sass imports
  // ~ is used for vscode node_modules navigation within sass files
  resolve: {
    // @ts-ignore replacement can be a function
    alias: [{
        find: /^~.+/,
        replacement: (val: string) => val.replace(/^~/, "")
    }],
  }
})
