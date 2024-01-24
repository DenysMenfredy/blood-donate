import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { EsLinter, linterPlugin, TypeScriptLinter } from "vite-plugin-linter";

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  plugins: [
    vue(),
    linterPlugin({
      include: ["./src/**/*.ts", "./src/**/*.tsx"],
      linters: [new EsLinter({ configEnv: configEnv }), new TypeScriptLinter()],
    })
  ],
}))
