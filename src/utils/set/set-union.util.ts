export function setUnion<T = any>(a: Set<T>, b: Set<T>): Set<T> {
    const union = new Set(a);
    for (const elem of b) {
        union.add(elem);
    }
    return union;
}
