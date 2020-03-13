export function setIsSubset<T = any>(subset: Set<T>, superset: Set<T>): boolean {
    for (const el of subset) {
        if (!superset.has(el)) {
            return false;
        }
    }
    return true;
}
