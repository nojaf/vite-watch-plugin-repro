import { normalizePath } from 'vite';
import path from "node:path";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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
            await sleep(500);
            return null;
        },
    }
}

// Run `npx rollup --config .\rollup.config.js --watch`
// And edit file text file

export default {
  input: './main.js',
  output: {
    'file':'./bundle.js',
    'format':'esm'
  },
  plugins: [
    myPlugin()
  ]
}