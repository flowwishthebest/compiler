export function setIntersection<T = any>(a: Set<T>, b: Set<T>): Set<T> {
    const intersection = new Set<T>();
    for (const el of b) {
        if (a.has(el)) {
            intersection.add(el);
        }
    }
    return intersection;
}
