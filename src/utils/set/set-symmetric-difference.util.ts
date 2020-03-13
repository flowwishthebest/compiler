export function setSymmetricDifference<T = any>(a: Set<T>, b: Set<T>): Set<T> {
    const difference = new Set(a);
    for (const el of b) {
        if (difference.has(el)) {
            difference.delete(el);
        } else {
            difference.add(el);
        }
    }
    return difference;
}
