export function setDifference<T = any>(a: Set<T>, b: Set<T>): Set<T> {
    const difference = new Set(a);
    for (const el of b) {
        difference.delete(el);
    }
    return difference;
}
