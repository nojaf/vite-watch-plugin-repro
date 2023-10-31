import { defineConfig, normalizePath } from 'vite';
import path from "node:path";


function myPlugin() {
    return {
        name: "repro-plugin",
        buildStart: async function () {
            const textFile = normalizePath(path.resolve(process.cwd(), "notes.text"));
            console.log(`About to watch: ${textFile}`)
            this.addWatchFile(textFile);
        },
        watchChange: async function (id, change) {
            console.log("watchChange", id, change);
            return null;
        },
    }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    myPlugin()
  ]
})
