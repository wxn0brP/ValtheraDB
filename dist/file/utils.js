import { createReadStream } from "fs";
/**
 * Repairs a file path by replacing double slashes
 */
export function pathRepair(path) {
    return path.replaceAll("//", "/");
}
export function createRL(file) {
    const stream = createReadStream(file, { highWaterMark: 64 * 1024 });
    let buffer = "";
    let done = false;
    let error = null;
    const lines = [];
    let waiting = null;
    stream.on("data", (chunk) => {
        buffer += chunk.toString("utf8");
        let index;
        while ((index = buffer.search(/\r?\n/)) >= 0) {
            const line = buffer.slice(0, index);
            lines.push(line);
            buffer = buffer.slice(index + (buffer[index] === "\r" && buffer[index + 1] === "\n" ? 2 : 1));
        }
        feed();
    });
    stream.on("end", () => {
        if (buffer.length > 0) {
            lines.push(buffer);
            buffer = "";
        }
        done = true;
        feed();
    });
    stream.on("error", (err) => {
        error = err;
        done = true;
        feed();
    });
    const feed = () => {
        if (waiting) {
            if (error) {
                waiting(Promise.reject(error));
            }
            else if (lines.length > 0) {
                waiting({ value: lines.shift(), done: false });
            }
            else if (done) {
                waiting({ value: undefined, done: true });
            }
            else {
                return;
            }
            waiting = null;
        }
    };
    const iterator = {
        next() {
            if (error)
                return Promise.reject(error);
            if (lines.length > 0)
                return Promise.resolve({ value: lines.shift(), done: false });
            if (done)
                return Promise.resolve({ value: undefined, done: true });
            return new Promise(res => {
                waiting = res;
            });
        },
        return() {
            rl.close();
            return Promise.resolve({ value: undefined, done: true });
        }
    };
    const rl = {
        [Symbol.asyncIterator]() {
            return iterator;
        },
        close() {
            if (!done) {
                done = true;
                stream.destroy();
            }
        }
    };
    return rl;
}
