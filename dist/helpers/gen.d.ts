import Id from "../types/Id.js";
/**
 * Generates a unique random identifier based on time and parts.
 *
 * @param {number[]} [parts] - an array of lengths of parts of the identifier
 * @returns {Id} - a new unique identifier
 */
export default function genId(parts?: number[]): Id;
