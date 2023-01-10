import { rollupPluginHTML as html } from "@web/rollup-plugin-html";
import nodeResolve from "@rollup/plugin-node-resolve";

export default {
  input: "index.html",
  output: { dir: "dist", preserveModules: true },
  plugins: [html(), nodeResolve()],
};
