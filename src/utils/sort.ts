export function compareSafe(a: any, b: any): -1 | 0 | 1 {
    // Null/undefined at the end
    if (a == null && b != null) return 1;
    if (a != null && b == null) return -1;
    if (a == null && b == null) return 0;

    // Compare primitives and Date
    const typeA = typeof a;
    const typeB = typeof b;

    if (typeA === "string" && typeB === "string") {
        return a.localeCompare(b);
    }

    if ((typeA === "number" || a instanceof Date) && (typeB === "number" || b instanceof Date)) {
        return (a < b) ? -1 : (a > b) ? 1 : 0;
    }

    if (typeA === "boolean" && typeB === "boolean") {
        return (a === b) ? 0 : a ? 1 : -1;
    }

    // fallback: if both are objects/arrays or different types, consider equal
    return 0;
}
