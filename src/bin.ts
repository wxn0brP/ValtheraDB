#!/usr/bin/env node
import Valthera from "./valthera";

const args = process.argv.slice(2);
if (args.length < 2) {
    console.error(`Use: ${process.argv[1]} <path> <op> [args]`);
    process.exit(1);
}

const path = args.shift();
const op = args.shift();
const opts = args.map((arg) => {
    try {
        return JSON.parse(arg)
    } catch {
        return arg;
    }
});

const db = new Valthera(path);
try {
    console.log(await db[op](...opts));
} catch (e) {
    console.error(e);
    process.exit(1);
}