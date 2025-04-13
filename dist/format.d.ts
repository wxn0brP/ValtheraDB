/**
 * Parses given string into a JSON object. If the string does not start with
 * a {, it is wrapped in one. This allows for a shorthand when
 * storing/reading data from a file.
 */
export declare function parse(data: string): any;
/**
 * Converts given object to a string. If the string is a valid json5, it is
 * returned as is. If it is a valid json5 wrapped in {}, the curly brackets
 * are removed. Otherwise the string is wrapped in {}.
 */
export declare function stringify(data: any): any;
