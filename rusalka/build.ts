import { readFileSync, writeFileSync } from "fs";
export const publishToNpm = true;
export function postBuildFn() {
    const version = JSON.parse(readFileSync("./package.json", "utf-8")).version;
    writeFileSync("./dist/version.js", `export const version = "${version}";`);
}

export const typeDocs = 0;