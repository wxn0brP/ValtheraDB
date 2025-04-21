import esbuild from "esbuild";

esbuild.build({
    entryPoints: [
        "../dist/client/valthera.js",
        "../dist/client/graph.js"
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
