import copy from "rollup-plugin-copy";
import watch from "rollup-plugin-watch-assets";

export default {
  input: "src/index.js",
  output: {
    file: "dist/app.js",
    format: "es"
  },
  plugins: [
    copy({
      targets: [
        { src: "public/index.html", dest: "dist" },
        { src: "src/assets/**/*", dest: "dist/assets" },
        { src: "src/style.css", dest: "dist" }
      ]
    }),
    watch({
      assets: ["src"]
    })
  ]
}
