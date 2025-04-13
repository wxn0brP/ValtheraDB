/**
 * Repairs a file path by replacing double slashes
 */
export declare function pathRepair(path: string): string;
/**
 * Creates a Readline interface for reading large files with a specified high water mark.
 */
export declare function createRL(file: string): import("readline").Interface;
