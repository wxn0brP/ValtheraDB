import esbuild from "esbuild";

esbuild.build({
    entryPoints: [
        "node_modules/@wxn0brp/db-client/dist/valthera.js",
        "node_modules/@wxn0brp/db-client/dist/graph.js"
    ],
    outdir: "dist",
    format: "esm",
    target: "esnext",
    bundle: true,
    sourcemap: true,
    external: [],
    splitting: false,
    minify: true,
    keepNames: true,
    alias: {
        "ky": "./kyShim.js"
    }
}).catch(() => process.exit(1));
